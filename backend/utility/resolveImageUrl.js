const { isRemoteUrl } = require("./uploadImage");

function getBackendBaseUrl() {
  const base =
    process.env.PUBLIC_API_URL ||
    process.env.RENDER_EXTERNAL_URL ||
    process.env.BACKEND_URL ||
    "http://localhost:5000/";

  return base.endsWith("/") ? base : `${base}/`;
}

function resolvePublicImageUrl(image, folder) {
  if (!image) return image;
  if (isRemoteUrl(image)) return image;

  return `${getBackendBaseUrl()}images/${folder}/${image}`;
}

function resolveCategoryImage(category) {
  if (!category) return category;

  const doc = category.toObject ? category.toObject() : { ...category };

  return {
    ...doc,
    image: resolvePublicImageUrl(doc.image, "categoryImg"),
  };
}

function resolveBrandImage(brand) {
  if (!brand) return brand;

  const doc = brand.toObject ? brand.toObject() : { ...brand };

  return {
    ...doc,
    logo: resolvePublicImageUrl(doc.logo, "brands"),
  };
}

module.exports = {
  resolvePublicImageUrl,
  resolveCategoryImage,
  resolveBrandImage,
};
