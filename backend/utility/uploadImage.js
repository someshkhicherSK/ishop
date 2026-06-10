const path = require("path");
const fs = require("fs");
const categoryUniqueName = require("./helper");

let imagekitClient = null;

function getImageKitClient() {
  if (imagekitClient) return imagekitClient;

  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  if (!privateKey) return null;

  const ImageKit = require("@imagekit/nodejs");
  imagekitClient = new ImageKit({ privateKey });
  return imagekitClient;
}

function isRemoteUrl(value) {
  return (
    typeof value === "string" &&
    (value.startsWith("http://") || value.startsWith("https://"))
  );
}

async function getFileBuffer(file) {
  if (file.data?.length) {
    return file.data;
  }

  if (file.tempFilePath) {
    return fs.promises.readFile(file.tempFilePath);
  }

  throw new Error("Uploaded file is empty");
}

async function saveLocalImage(file, folder) {
  const filename = categoryUniqueName(file.name);
  const dir = path.join(__dirname, "..", "public", "images", folder);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (file.tempFilePath) {
    await file.mv(path.join(dir, filename));
  } else {
    const buffer = await getFileBuffer(file);
    await fs.promises.writeFile(path.join(dir, filename), buffer);
  }

  return filename;
}

async function uploadImage(file, folder) {
  if (!file) {
    throw new Error("No file provided");
  }

  const safeName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
  const buffer = await getFileBuffer(file);
  const client = getImageKitClient();

  if (client) {
    try {
      const upload = await client.files.upload({
        file: buffer,
        fileName: safeName,
        folder: `/${folder}`,
      });

      if (upload?.url) {
        return upload.url;
      }
    } catch (error) {
      console.log("ImageKit upload failed, using MongoDB storage:", error.message);
    }
  }

  try {
    const { uploadToGridFS } = require("./gridfsStorage");
    return await uploadToGridFS(file, folder);
  } catch (error) {
    console.log("GridFS upload failed, using local storage:", error.message);
  }

  return saveLocalImage(file, folder);
}

module.exports = { uploadImage, isRemoteUrl };
