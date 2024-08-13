// Patches
const { inject, errorHandler } = require("express-custom-error");
inject(); // Patch express in order to use async / await syntax

// Require Dependencies
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const status = require("mod_status");
const bodyParser = require("body-parser");

const logger = require("./util/logger");
const appData = require("./config/app");
const dimensionsData = require("./config/dimensions.js");
const config = require("./middlewares/config");

const { VIDEOCAPTIONSPORT } = process.env;

const app = express();

// console.log("Environment: " + process.env.NODE_ENV);

// Configure custom logger middleware
app.use(logger.dev, logger.combined);

app.use((req, res, next) => {
  if (req.path === "/api/webhook") {
    return require("./routes/router.js")(req, res, next);
  }
  next();
});

// Configure Express App Instance
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser());

app.use(helmet());

app.use(bodyParser.json());

app.use(
  status({
    url: "/status",
    version: true,
    uptime: true,
  })
);
app.use(cors());
app.use(config(dimensionsData, appData));

app.use((req, res, next) => {
  console.log("Origin: " + req.get("origin"));
  next();
});

// const origin =
//   process.env.NODE_ENV === "development"
//     ? ["http://localhost:3004"]
//     : [
//         "https://videocaptionsai.com",
//         "https://www.videocaptionsai.com",
//         "https://i.videocaptionsai.com",
//         "https://testi.videocaptionsai.com",
//       ];

const origin = "http://localhost:3004";

// enable preflight for all
app.options("*", cors());

app.use(
  cors({
    credentials: true,
    origin,
    preflightContinue: true,
    allowedHeaders:
      "Origin,X-Requested-With,Content-Type,Accept,Authorization,X-PINGOTHER",
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "HEAD", "OPTIONS"],
  })
);

// This middleware adds the json header to every response
app.use("*", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.use("/", require("./routes/router.js"));

// Handle errors
app.use(errorHandler());

// Handle not valid route
app.use("*", (req, res) => {
  res.status(404).json({ status: false, message: "Endpoint Not Found" });
});

// Open Server on selected Port
app.listen(VIDEOCAPTIONSPORT, async () => {
  console.info("Server listening on port ", VIDEOCAPTIONSPORT);
});
