const fs = require("fs");
const path = require("path");
const { AssemblyAI } = require("assemblyai");
const { exec } = require("child_process");
const { v4: uuidv4 } = require("uuid");

const {
  createVideo,
  updateVideoStatus,
  getVideoStatus,
  getLatestVideoStatus,
} = require("../models/video");
const {
  objectsToSrt,
  srtToObjects,
  transcriptionItemsToArr,
} = require("../util/srtObjectConverter");
const { hexToAssBGR } = require("../util/assHexStyleConverter");
const { uploadFile } = require("../util/uploader");
const { sampleVideoLinks } = require("../util/constants");

const API_KEY = process.env.API_KEY;
const client = new AssemblyAI({ apiKey: API_KEY });

const templateThemes = {
  1: {
    Theme:
      "Style: Default,Roboto,18,&H0000ffff,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,1,1.5,2,10,10,60,0",
  },
  2: {
    Theme:
      "Style: Default,Roboto,18,&H00FFFFFF,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,0,0,2,10,10,60,0",
  },
  3: {
    Theme:
      "Style: Default,Komika Title - Paint,20,&H00FFFFFF,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,2,0,2,10,10,60,0",
  },
  4: {
    Theme:
      "Style: Default,Roboto,18,&H00000000,&H00000000,&H0001DBFF,&H00A805A7,0,0,0,0,100,100,0,0,3,4,0,2,10,10,60,128",
  },
  5: {
    Theme:
      "Style: Default,The Bold Font,25,&H00FFFFFF,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,2,0,2,28,28,67,0",
  },
  6: {
    Theme:
      "Style: Default,Opinion Pro,120,&H00FFFFFF,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,0.5,5.5,2,28,28,400,0",
  },
};

async function getSampleVideo(req, res) {
  const { userId, email } = req.context;
  console.log("userId:", userId);
  const dirPath = path.join(__dirname, "../");
  console.log("function invoked");

  const templateNo = req.query.templateNo;
  let sampleNumber = req.query.sampleNo;
  try {
    setTimeout(() => {
      console.log("sampleNumber:", sampleNumber);
      console.log("TemplateNo:", templateNo);
      let SampleUrl = sampleVideoLinks[sampleNumber][templateNo];
      console.log("SampleUrl:", SampleUrl);
      res.json({
        data: {
          url: SampleUrl,
        },
      });
      return;
    }, 1000);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: "Something went wrong!",
      message: { title: "Invalid template number or sample number" },
    });
  }
}

async function createSRTSubtitles(req, res) {
  const { userId } = req.context;
  const dirPath = path.join(__dirname, "../" + "srt/");
  try {
    const templateNo = req.query.templateNo;
    const transcriptArray = req.body.transcript;
    const hexCode = req.query.hexCode;

    const srtData = await objectsToSrt(transcriptArray);
    console.log("Template Number: " + templateNo);
    const FILE_URL = req.body.videourl;
    const selectedTheme = templateThemes[templateNo];
    if (!selectedTheme) {
      console.error("Invalid template number:", templateNo);
      res.status(400).json({
        error: "Bad Request",
        message: { title: "Invalid template number" },
      });
      return;
    }
    const transcriptData = { audio_url: FILE_URL };
    console.log(transcriptData);
    const uniquePrefix = `${uuidv4()}_`;
    const videoData = {
      videoId: uniquePrefix,
      userId: userId,
    };
    await createVideo(videoData);
    await updateVideoStatus(uniquePrefix, "AI is creating transcript");

    fs.writeFileSync(dirPath + uniquePrefix + "output.srt", srtData);

    const srtFilePath = dirPath + uniquePrefix + "output.srt";
    const assFilePath = dirPath + uniquePrefix + "output.ass";

    // Conversion from SRT to ASS using FFmpeg
    const assConversionCommand = `ffmpeg -i ${srtFilePath} -vf "subtitles=${srtFilePath}" ${assFilePath}`;
    exec(assConversionCommand, async (error, stdout, stderr) => {
      if (error) {
        console.error("FFmpeg Conversion Error:", error);
        console.error("FFmpeg stderr:", stderr);
        res.status(500).json({
          error: "Internal Server Error",
          reason: "Conversion Error",
          message: {
            title: "Downlolad failed!",
            body: "Error during FFmpeg conversion to ASS",
          },
        });
        return;
      }

      let fileContent = fs.readFileSync(assFilePath, "utf-8");
      const selectedTheme = templateThemes[templateNo];
      let newStyleLine = selectedTheme.Theme;

      if (hexCode) {
        const primaryColor = hexToAssBGR(hexCode);
        newStyleLine = newStyleLine.replace(/&[^,]*/, primaryColor);
      }
      if (hexCode) console.log("success");

      fileContent = fileContent.replace(/^Style: Default,.+$/m, newStyleLine);
      console.log(fileContent);
      fs.writeFileSync(assFilePath, fileContent, "utf-8");

      const command = `ffmpeg -i ${FILE_URL} -vf "ass=${assFilePath}" ${
        dirPath + uniquePrefix
      }output.mp4`;

      exec(command, async (error, stdout, stderr) => {
        if (error) {
          console.error("FFmpeg Execution Error:", error);
          console.error("FFmpeg stderr:", stderr);
          res.status(500).json({
            error: "Internal Server Error",
            message: {
              title: "Download failed!",
              body: "Error during FFmpeg execution",
            },
          });
          return;
        }

        const fileUrl = await uploadFile(
          `${dirPath + uniquePrefix}output.mp4`,
          uniquePrefix
        );
        console.log(fileUrl);
        await updateVideoStatus(uniquePrefix, "Process Completed");
        await getVideoStatus(uniquePrefix);
        fs.unlinkSync(`${dirPath + uniquePrefix}output.srt`);

        fs.unlinkSync(`${dirPath + uniquePrefix}output.mp4`);

        res.json({
          data: {
            url: fileUrl,
          },
        });
      });
    });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: {
        title: "Error",
        body: "An error occurred during subtitle creation",
      },
    });
  }
}

async function getCurrentVideoStatus(req, res) {
  const video = await getLatestVideoStatus();

  res.json({
    data: video,
  });
}

async function getTranscription(req, res) {
  console.log("getTranscription");
  console.log("FILE_URL ", req?.file);
  const language_code = req.query.languageCode;
  // console.log(req.body?.languageCode);
  try {
    const uniquePrefix = `${uuidv4()}_`;
    let fileUrl;
    const FILE_URL = req?.file?.path;
    console.log("FILE_URL ", FILE_URL);
    if (FILE_URL) {
      fileUrl = await uploadFile(`${FILE_URL}`, uniquePrefix);
    } else {
      fileUrl = req.body.awsurl;
    }

    // const transcriptData = { audio_url: fileUrl };
    const params = {
      audio: fileUrl,
      language_code,
    };
    let transcript;

    try {
      if (fileUrl) {
        transcript = await client.transcripts.transcribe(params);

        console.log(transcript);

        // console.log(transcription);
        // transcript = await client.transcripts.transcribe(params);
        console.log("Transcript created");
      }
    } catch (error) {
      console.log("transcriptionerror:", error);
    }

    if (!transcript || !transcript.id) {
      console.error("Invalid transcript object:");
      res.status(500).json({
        error: "Internal Server Error",
        message: {
          title: "Invalid transcript object",
          body: "Invalid transcript object",
        },
      });
      return;
    }

    let status = "queued";
    while (status !== "completed") {
      const { status: newStatus } = await client.transcripts.get(transcript.id);

      status = newStatus;
      if (status === "completed") {
        console.log("Transcript is completed. ");
      } else {
        // console.log("Transcript is still processing...");
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
    console.log("transcript ", transcript);
    res.json({
      data: {
        fileUrl: FILE_URL,
        videoUrl: fileUrl,
        transcript: transcriptionItemsToArr(transcript.words),
      },
    });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: {
        title: "Error",
        body: "An error occurred during subtitle creation",
      },
    });
  }
}

module.exports = {
  createSRTSubtitles,
  getSampleVideo,
  getCurrentVideoStatus,
  getTranscription,
};
