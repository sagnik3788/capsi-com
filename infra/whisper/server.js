const express = require('express')
const multer = require('multer')
const fs = require('fs')
const { exec } = require('child_process')
const ffmpeg = require('fluent-ffmpeg')
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const { transliterate } = require('transliteration');
const Sanscript = require("@indic-transliteration/sanscript")
const slug = require('slug');
const OpenAI = require('openai');
const { getFirestore, doc, setDoc, getDoc, updateDoc } = require('firebase-admin/firestore');
const admin = require('firebase-admin');
const AWS = require('aws-sdk');
const temp = require('temp');
const streamifier = require('streamifier');
const openai = new OpenAI({
    apiKey: "key",
});


const dotenv = require('dotenv');
dotenv.config();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const cron = require('node-cron');

const db = getFirestore();


const app = express();
app.use(cors());
app.use(express.json());


// Configure AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});


const upload = multer({ storage: storage });



async function uploadToS3(filePath, bucketName) {
    const fileContent = fs.readFileSync(filePath);
    const params = {
        Bucket: bucketName,
        Key: path.basename(filePath),
        Body: fileContent,
    };

    return s3.upload(params).promise();
}



async function deleteFromS3(filePath, bucketName) {
    const params = {
        Bucket: bucketName,
        Key: path.basename(filePath),
    };

    return s3.deleteObject(params).promise();
}

async function deleteFileFromS3(bucketName, key) {
    const params = {
        Bucket: bucketName,
        Key: key,
    };

    try {
        await s3.deleteObject(params).promise();
        console.log(`File ${key} deleted from bucket ${bucketName}`);
    } catch (error) {
        console.error(`Error deleting file ${key} from bucket ${bucketName}:`, error);
        throw error; // Rethrow the error after logging it
    }
}


app.post('/api/process-video', upload.single('video'), async (req, res) => {
    try {
        const videoPath = req.file.path;
        const outputPath = `${videoPath}_output.mp4`;
        const watermarkPath = path.join(__dirname, 'watermarks', 'watermark.svg');

        const transcription = await transcribeVideo(videoPath);


        const srtContent = generateSRT(transcription.words);
        console.log(srtContent)
        let outputSrt;

        if (transcription.language === "english") {
            outputSrt = srtContent;
        } else {
            outputSrt = await convertHindiToHinglish(srtContent, transcription.language);
        }



        const srtFilePath = path.join(__dirname, 'uploads', `${req.file.filename.replace('.mp4', '')}.srt`);
        fs.writeFileSync(srtFilePath, outputSrt);



        // Upload video and SRT to S3

        const videoUpload = await uploadToS3(videoPath, 'capsuservideos');
        const srtUpload = await uploadToS3(srtFilePath, 'capsuservideos');
        console.log(videoUpload, srtUpload)
        fs.unlinkSync(videoPath);
        fs.unlinkSync(srtFilePath);


        res.json({
            transcription: formatSubtitle(outputSrt),
            rawData: transcription.words,
            inputFile: videoUpload.Location,
            lang: transcription.language,
            srt: srtUpload.Location,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/change-style', upload.single('video'), async (req, res) => {
    try {
        const { inputVideo, font, color, xPosition, yPosition, srtUrl, Fontsize, userdata, uid } = req.body;

        if (!inputVideo || !font || !color || !xPosition || !yPosition || !srtUrl || !Fontsize || !userdata || !uid) {
            return res.status(400).json({ error: 'Missing required fields in the request body' });
        }
        const watermarkPath = path.join(__dirname, 'watermarks', 'watermark.svg');
        const videoPath = inputVideo;
        const srtFilePath = path.join(__dirname, 'uploads', `${path.basename(srtUrl)}`);
        const srtResponse = await axios.get(srtUrl);
        fs.writeFileSync(srtFilePath, srtResponse.data);
        const tempOutputPath = temp.path({ suffix: '.mp4' });
        let remaningmins = 0;

        // Check video length and user type
        const videoDuration = await getVideoDuration(videoPath);
        if (userdata.usertype === 'free') {
            if (videoDuration > 3) {
                return res.status(400).json({ error: 'Video length exceeds 3 minutes limit for free users' });
            }
            else {
                remaningmins = userdata.videomins - videoDuration;
                console.log(remaningmins);
            }
        }

        const outputFilePath = videoPath.replace('.mp4', `_output.mp4`);
        await new Promise((resolve, reject) => {
            const ffmpegCommand = `ffmpeg -i ${videoPath} -i ${watermarkPath} -filter_complex "[1:v] scale=203.2:94.832 [watermark]; [0:v][watermark] overlay=10:10, subtitles=${srtFilePath}:force_style='Fontname=${font},Fontsize=${Fontsize},PrimaryColour=&H${color.slice(5, 7)}${color.slice(3, 5)}${color.slice(1, 3)}&,Alignment=2,MarginV=${yPosition}'" -c:a copy ${tempOutputPath}`;
            exec(ffmpegCommand, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(stdout);
                }
            });
        });

        // Upload output video to S3
        const outputUpload = await uploadToS3(tempOutputPath, 'capsuservideos');
        const outputVideoUrl = outputUpload.Location;

        // Schedule deletion based on user type
        if (userdata.usertype === 'free') {
            scheduleFileDeletion('capsuservideos', outputUpload.Key, 2); // 24 hours
        } else {
            scheduleFileDeletion('capsuservideos', outputUpload.Key, 30 * 24 * 60 * 60 * 1000); // 1 month
        }

        // Delete the input video
        await deleteFromS3(videoPath, 'capsuservideos');

        const videos = userdata.videos || [];


        await db.collection('users').doc(uid).collection('videos').add({
            videoUrl: outputVideoUrl,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            key: outputUpload.Key
        });

        const userRef = db.collection('users').doc(uid);

        const exact = Math.round(remaningmins)
        console.log(exact, "rounded")
        await userRef.update({
            videomins: exact,
        });

        fs.unlinkSync(srtFilePath)

        res.json({ videoUrl: outputVideoUrl, rem: exact });
    } catch (error) {
        console.error('Error changing style:', error);
        res.status(500).json({ error: error.message });
    }
});

function formatSubtitle(text) {
    const entries = text.trim().split('\n\n');
    const result = [];

    entries.forEach(entry => {
        const lines = entry.split('\n');
        const idLine = lines[0].trim();
        const timeLine = lines[1].trim();
        const valueLine = lines.slice(2).join(' ').trim();

        const idValue = parseInt(idLine);
        const [timeStart, timeEnd] = timeLine.match(/\d{2}:\d{2}:\d{2},\d{3}/g);

        const words = valueLine.match(/[\w'-]+|[^\w\s]/g);
        const totalDuration = parseTimecode(timeEnd) - parseTimecode(timeStart);
        const wordDuration = totalDuration / words.length;

        words.forEach((word, index) => {
            const wordTimeStart = parseTimecode(timeStart) + (index * wordDuration);
            const wordTimeEnd = wordTimeStart + wordDuration;

            const formattedEntry = {
                id: `${idValue}-${index + 1}`,
                timeStart: formatTimecode(wordTimeStart),
                timeEnd: formatTimecode(wordTimeEnd),
                value: word,
            };
            result.push(formattedEntry);
        });
    });

    return result;
}

function parseTimecode(timecode) {
    const [hours, minutes, seconds] = timecode.split(':');
    const [secs, millis] = seconds.split(',');
    return (parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(secs)) * 1000 + parseInt(millis);
}

function formatTimecode(milliseconds) {
    const hours = Math.floor(milliseconds / 3600000).toString().padStart(2, '0');
    const minutes = Math.floor((milliseconds % 3600000) / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((milliseconds % 60000) / 1000).toString().padStart(2, '0');
    const millis = (milliseconds % 1000).toString().padStart(3, '0');
    return `${hours}:${minutes}:${seconds},${millis}`;
}

async function transcribeVideo(videoPath) {
    try {
        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(videoPath),
            model: "whisper-1",
            response_format: "verbose_json",
            timestamp_granularities: ["word"]
        });
        // const words = transcription;
        return transcription;
    } catch (error) {
        console.error('Error transcribing video:', error);
        throw error;
    }
}

async function convertHindiToHinglish(changetext, language) {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: `Convert the following Hindi text to Hinglish in SRT format. Provide only the translation in plain SRT format without any code block or additional formatting:\n\n${changetext}` },
            ],
            model: "gpt-4o-mini-2024-07-18",
        });

        const hinglishText = completion.choices[0].message.content;
        return hinglishText;
    } catch (error) {
        console.error("Error translating text:", error);
    }
}

function generateSRT(words) {
    let srt = '';
    words.forEach((el, index) => {
        const startTime = timestampToSRTFormat(el.start);
        const endTime = timestampToSRTFormat(el.end);

        srt += `${index + 1}\n`;
        srt += `${startTime} --> ${endTime}\n`;
        srt += `${el.word}\n\n`;
    });
    return srt;
}

function timestampToSRTFormat(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = (date.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5);
    return `${hours}:${minutes}:${seconds},${milliseconds}`;
}

async function getVideoDuration(filePath) {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(filePath, (err, metadata) => {
            if (err) {
                reject(err);
            } else {
                const duration = metadata.format.duration / 60; // in minutes
                resolve(duration);
            }
        });
    });
}


const scheduleFileDeletion = (bucketName, key, delayInMinutes) => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + delayInMinutes);

    const cronExpression = `${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${date.getMonth() + 1} *`;

    cron.schedule(cronExpression, async () => {
        try {
            await deleteFileFromS3(bucketName, key);
            console.log(`File ${key} deleted from ${bucketName}`);
        } catch (error) {
            console.error(`Error deleting file ${key} from ${bucketName}:`, error);
        }
    });
};

app.listen(3000, () => console.log('Server running on port 3000'));




// const express = require("express");
// const cors = require("cors");
// const crypto = require("crypto");
// const { Cashfree } = require("cashfree-pg");

// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );

// Cashfree.XClientId = process.env.CLIENT_ID;
// Cashfree.XClientSecret = process.env.CLIENT_SECRET;
// Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

// function generateOrderId() {
//   const uniqueId = crypto.randomBytes(16).toString("hex");

//   const hash = crypto.createHash("sha256");
//   hash.update(uniqueId);

//   const orderId = hash.digest("hex");
//   7;

//   return orderId.substr(0, 12);
// }

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
// app.get("/payment", async (req, res) => {
//   try {
//     const orderAmount = req.query.order_amount || 0;
//     let request = {
//       order_amount: orderAmount,
//       order_currency: "INR",
//       order_id: await generateOrderId(),
//       customer_details: {
//         customer_id: "webcodder01",
//         customer_phone: "9999999999",
//         customer_name: "Web Codder",
//         customer_email: "webcodder@example.com",
//       },
//     };

//     Cashfree.PGCreateOrder("2023-08-01", request)
//       .then((response) => {
//         console.log(response.data);
//         res.json(response.data);
//       })
//       .catch((error) => {
//         console.error(error.response.data.message);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.post("/verify", async (req, res) => {
//   try {
//     let { orderId } = req.body;

//     Cashfree.PGOrderFetchPayments("2023-08-01", orderId)
//       .then((response) => {
//         res.json(response.data);
//       })
//       .catch((error) => {
//         console.error(error.response.data.message);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.listen(8000, () => {
//   console.log("Server is running on port 8000");
// });
