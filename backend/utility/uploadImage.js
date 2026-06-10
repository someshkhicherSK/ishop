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

async function saveLocalImage(file, folder) {
  const filename = categoryUniqueName(file.name);
  const dir = path.join(__dirname, "..", "public", "images", folder);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  await file.mv(path.join(dir, filename));
  return filename;
}

async function uploadImage(file, folder) {
  if (!file) {
    throw new Error("No file provided");
  }

  const client = getImageKitClient();
  const safeName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;

  if (client) {
    const upload = await client.files.upload({
      file: file.data,
      fileName: safeName,
      folder: `/${folder}`,
    });

    if (!upload?.url) {
      throw new Error("Image upload failed");
    }

    return upload.url;
  }

  return saveLocalImage(file, folder);
}

module.exports = { uploadImage, isRemoteUrl };
