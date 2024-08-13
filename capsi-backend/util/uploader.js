const fs = require("fs");
const AWS = require("aws-sdk");
const { AWS_ACCESS_ID, AWS_ACCESS_KEY, AWS_BUCKET_NAME } = process.env;
let prev = "";
function uploadFile(fileName, prefix) {
  console.log("uploaded ", fileName, " fileName, prefix ", prefix);
  const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_ID,
    secretAccessKey: AWS_ACCESS_KEY,
  });

  if (prev == fileName) {
    return;
  }
  const fileContent = fs.readFileSync(fileName);

  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key: `/user/v/${prefix}output.mp4`,
    Body: fileContent,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, function (err, data) {
      if (err) {
        console.error("Error uploading file:", err);
        reject(err);
      } else {
        console.log(`File uploaded successfully. ${data.Location}`);
        resolve(data.Location);
      }
    });
  });
}

module.exports = {
  uploadFile,
};
