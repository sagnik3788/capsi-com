const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const multer = require("multer");
const path = require("path");
const {
  createSRTSubtitles,
  getCurrentVideoStatus,
  getTranscription,
  getSampleVideo,
} = require("../controllers/process");
const accessCheck = require("../middlewares/accessCheck");
const subscriptionCheck = require("../middlewares/subscriptionCheck");
const userAuth = require("../middlewares/userAuth");
global.fetch = fetch;

const upload = multer({ dest: path.join(__dirname, "../") + "uploads/" });

router.post(
  "/api/process/samplevideo",
  userAuth,
  upload.single("video"),
  getSampleVideo
);

router.post(
  "/api/process/createsrt",
  userAuth,
  upload.single("video"),
  createSRTSubtitles
);

router.post(
  "/api/process/getTranscribe",
  upload.single("video"),
  getTranscription
);

router.get("/api/process/getVideoStatus", getCurrentVideoStatus);

module.exports = router;
