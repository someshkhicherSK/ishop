const mongoose = require("mongoose");
const { GridFSBucket, ObjectId } = require("mongodb");
const fs = require("fs");

let bucket = null;

function getBackendBaseUrl() {
  const base =
    process.env.PUBLIC_API_URL ||
    process.env.RENDER_EXTERNAL_URL ||
    process.env.BACKEND_URL ||
    `http://localhost:${process.env.PORT || 5000}/`;

  return base.endsWith("/") ? base : `${base}/`;
}

function getBucket() {
  if (!mongoose.connection?.db) {
    throw new Error("Database not connected");
  }

  if (!bucket) {
    bucket = new GridFSBucket(mongoose.connection.db, { bucketName: "uploads" });
  }

  return bucket;
}

async function uploadToGridFS(file, folder) {
  const bucket = getBucket();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const filename = `${folder}/${Date.now()}_${safeName}`;

  const buffer = file.data?.length
    ? file.data
    : file.tempFilePath
      ? await fs.promises.readFile(file.tempFilePath)
      : null;

  if (!buffer) {
    throw new Error("Uploaded file is empty");
  }

  return new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(filename, {
      contentType: file.mimetype || "application/octet-stream",
    });

    uploadStream.on("error", reject);
    uploadStream.on("finish", () => {
      resolve(`${getBackendBaseUrl()}media/${uploadStream.id.toString()}`);
    });

    uploadStream.end(buffer);
  });
}

function streamGridFSFile(id, res) {
  const bucket = getBucket();
  const downloadStream = bucket.openDownloadStream(new ObjectId(id));

  downloadStream.on("error", () => {
    if (!res.headersSent) {
      res.status(404).json({ msg: "File not found" });
    }
  });

  downloadStream.pipe(res);
}

module.exports = { uploadToGridFS, streamGridFSFile, getBackendBaseUrl };
