const { isRemoteUrl } = require("./uploadImage");
const { getBackendBaseUrl } = require("./gridfsStorage");

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
