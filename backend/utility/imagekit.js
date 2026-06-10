const ImageKit = require("@imagekit/nodejs");

const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

const imagekit = privateKey
  ? new ImageKit({ privateKey })
  : null;

module.exports = imagekit;
