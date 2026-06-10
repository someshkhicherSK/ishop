const isProduction =
  process.env.NODE_ENV === "production" || Boolean(process.env.RENDER);

module.exports = {
  createParentPath: true,
  limits: { fileSize: 10 * 1024 * 1024 },
  useTempFiles: isProduction,
  tempFileDir: isProduction ? "/tmp" : undefined,
};
