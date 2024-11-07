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
  transcriptionItemsToArr,
} = require("../util/srtObjectConverter");
const { hexToAssBGR } = require("../util/assHexStyleConverter");
const { uploadFile } = require("../util/uploader");
const { sampleVideoLinks } = require("../util/constants");

const API_KEY = process.env.API_KEY;
const client = new AssemblyAI({ apiKey: API_KEY });

const templateThemes = {
  1: "Style: Default,Roboto,18,&H0000ffff,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,1,1.5,2,10,10,60,0",
  2: "Style: Default,Roboto,18,&H00FFFFFF,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,0,0,2,10,10,60,0",
  3: "Style: Default,Komika Title - Paint,20,&H00FFFFFF,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,2,0,2,10,10,60,0",
  4: "Style: Default,Roboto,18,&H00000000,&H00000000,&H0001DBFF,&H00A805A7,0,0,0,0,100,100,0,0,3,4,0,2,10,10,60,128",
  5: "Style: Default,The Bold Font,25,&H00FFFFFF,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,2,0,2,28,28,67,0",
  6: "Style: Default,Opinion Pro,120,&H00FFFFFF,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,0.5,5.5,2,28,28,400,0",
};

// Helper function to execute shell commands and handle errors
const execCommand = (command) => new Promise((resolve, reject) => {
  exec(command, (error, stdout, stderr) => {
    if (error) reject({ error, stderr });
    else resolve(stdout);
  });
});

// Helper function to send error response
const handleError = (res, status, title, body) => {
  res.status(status).json({
    error: "Internal Server Error",
    message: { title, body },
  });
};

async function getSampleVideo(req, res) {
  const { templateNo, sampleNo } = req.query;
  try {
    const sampleUrl = sampleVideoLinks[sampleNo]?.[templateNo];
    if (!sampleUrl) throw new Error("Invalid template or sample number");

    res.json({ data: { url: sampleUrl } });
  } catch (e) {
    console.error(e);
    handleError(res, 400, "Invalid template number or sample number", e.message);
  }
}

async function createSRTSubtitles(req, res) {
  const { userId } = req.context;
  const dirPath = path.join(__dirname, "../srt/");
  const uniquePrefix = `${uuidv4()}_`;

  try {
    const { templateNo, hexCode } = req.query;
    const { videourl: FILE_URL, transcript } = req.body;

    const theme = templateThemes[templateNo];
    if (!theme) return handleError(res, 400, "Invalid template number");

    const srtData = await objectsToSrt(transcript);
    const srtFilePath = path.join(dirPath, `${uniquePrefix}output.srt`);
    const assFilePath = path.join(dirPath, `${uniquePrefix}output.ass`);

    // Save SRT file
    fs.writeFileSync(srtFilePath, srtData);

    // Convert SRT to ASS with FFmpeg
    try {
      await execCommand(`ffmpeg -i ${srtFilePath} -vf "subtitles=${srtFilePath}" ${assFilePath}`);

      // Apply theme styling to ASS file
      let fileContent = fs.readFileSync(assFilePath, "utf-8");
      let styledTheme = hexCode ? theme.replace(/&[^,]*/, hexToAssBGR(hexCode)) : theme;
      fileContent = fileContent.replace(/^Style: Default,.+$/m, styledTheme);
      fs.writeFileSync(assFilePath, fileContent);

      // Overlay ASS on video with FFmpeg
      const outputPath = path.join(dirPath, `${uniquePrefix}output.mp4`);
      await execCommand(`ffmpeg -i ${FILE_URL} -vf "ass=${assFilePath}" ${outputPath}`);

      // Upload and return the processed video
      const fileUrl = await uploadFile(outputPath, uniquePrefix);
      await updateVideoStatus(uniquePrefix, "Process Completed");
      await getVideoStatus(uniquePrefix);
      res.json({ data: { url: fileUrl } });
      
      // Clean up
      fs.unlinkSync(srtFilePath);
      fs.unlinkSync(outputPath);
    } catch (error) {
      console.error("FFmpeg Error:", error);
      handleError(res, 500, "FFmpeg Conversion Failed", error.stderr);
    }
  } catch (error) {
    console.error("Subtitle creation error:", error);
    handleError(res, 500, "Subtitle creation failed", error.message);
  }
}

async function getCurrentVideoStatus(req, res) {
  try {
    const video = await getLatestVideoStatus();
    res.json({ data: video });
  } catch (error) {
    console.error("Status retrieval error:", error);
    handleError(res, 500, "Failed to retrieve video status");
  }
}

async function getTranscription(req, res) {
  const { languageCode } = req.query;
  const FILE_URL = req?.file?.path || req.body.awsurl;
  const uniquePrefix = `${uuidv4()}_`;

  if (!FILE_URL) {
    return handleError(res, 400, "No audio URL provided");
  }

  try {
    const fileUrl = await uploadFile(FILE_URL, uniquePrefix);
    const params = { audio: fileUrl, language_code: languageCode };

    // Transcribe and check status
    const { id } = await client.transcripts.transcribe(params);
    let status = "queued";

    while (status !== "completed") {
      const { status: newStatus } = await client.transcripts.get(id);
      status = newStatus;
      if (status !== "completed") await new Promise(resolve => setTimeout(resolve, 5000));
    }

    const transcript = await client.transcripts.get(id);
    res.json({
      data: {
        fileUrl: FILE_URL,
        videoUrl: fileUrl,
        transcript: transcriptionItemsToArr(transcript.words),
      },
    });
  } catch (error) {
    console.error("Transcription error:", error);
    handleError(res, 500, "Transcription process failed");
  }
}

module.exports = {
  createSRTSubtitles,
  getSampleVideo,
  getCurrentVideoStatus,
  getTranscription,
};
