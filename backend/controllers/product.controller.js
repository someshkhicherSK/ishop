const categoryModel = require("../models/category.model");
const brandModel = require("../models/brand.model");
const colorModel = require("../models/color.model");
const productModel = require("../models/product.model");
const { uploadImage, isRemoteUrl } = require("../utility/uploadImage");
const path = require("path");
const fs = require("fs");

const savefile = async (imageObj) => uploadImage(imageObj, "product");

const parseBool = (value, fallback = false) =>
  value === true || value === "true";

const getImageFiles = (files) => {
  if (!files) return [];
  return Array.isArray(files) ? files : [files];
};
const productController = {
  async getProduct(req, res) {
    const { id } = req.params;
    const {categorySlug,brandSlug,colorSlug,min,max}=req.query;

    let getProduct = null
    try {
      let filterquery = {};
      if (categorySlug) {
          const category = await categoryModel.findOne({slug:categorySlug});

          if (category) {
            filterquery.categoryId = category._id;
          }
      }
      if (brandSlug) {
          const brand = await brandModel.findOne({slug:brandSlug});
          if (brand) {
            filterquery.BrandId = brand._id;
          }
      }
      if (colorSlug) {
          const color = await colorModel.findOne({slug:colorSlug});
          if (color) {
            filterquery.colors = color._id;
          }
      }
      if (min && max) {
        filterquery.finalPrice = {
          $gte:min,
          $lte:max
        }
      }
      if (id) {
        getProduct = await productModel.findById(id).populate(["categoryId", "BrandId", "colors"]);
      } else {
        getProduct = await productModel.find(filterquery).populate(["categoryId", "BrandId", "colors"])
      }
      if (getProduct) {
        return res.status(201).json({ msg: "Data Get Successfully...", getProduct });
      }
    } catch (error) {
      console.log(error)
      return res.status(501).json({ msg: "Internal Server Error..", success: false });
    }
  },
  async createProduct(req, res) {
    try {
      const {
        name,
        slug,
        shortDescription,
        longDescription,
        originalPrice,
        discountPercentage,
        finalPrice,
        categoryId,
        BrandId,
        colors,
        stock,
        topSelling,
        status,
      } = req.body;

      if (!name || !slug || !categoryId || !BrandId) {
        return res.status(400).json({
          msg: "Name, slug, category and brand are required",
          success: false,
        });
      }

      if (!req.files?.thumbnail) {
        return res.status(400).json({
          msg: "Thumbnail image is required",
          success: false,
        });
      }

      const existing = await productModel.findOne({ name });
      if (existing) {
        return res.status(301).json({ msg: "Product Already Exsiting...😢", success: false });
      }

      const thumbnail = await savefile(req.files.thumbnail);
      const images = req.files?.images
        ? await Promise.all(getImageFiles(req.files.images).map((img) => savefile(img)))
        : [];

      await productModel.create({
        name,
        slug,
        shortDescription,
        longDescription,
        originalPrice: Number(originalPrice) || 200,
        discountPercentage: Number(discountPercentage) || 0,
        finalPrice: Number(finalPrice) || Number(originalPrice) || 200,
        categoryId,
        BrandId,
        colors: colors ? JSON.parse(colors) : [],
        thumbnail,
        images,
        stock: parseBool(stock, true),
        topSelling: parseBool(topSelling, false),
        status: parseBool(status, true),
      });

      return res.status(201).json({ msg: "Product Create Successful...😘", success: true });
    } catch (error) {
      console.log("CREATE PRODUCT ERROR:", error);
      return res.status(500).json({
        msg: error.message || "Internal Server Error...",
        success: false,
      });
    }
  },
  async updateProduct(req, res) {
    const { id } = req.params;
    const { flag2 } = req.body;
    const existing = await productModel.findById(id);
    try {
      if (!existing) {
        return res.status(301).json({ msg: "product not exiting...", success: false });
      }
      const update = {};
      if (flag2 == 1) {
        update.status = !existing.status;
      } else if (flag2 == 2) {
        update.stock = !existing.stock;
      } else if (flag2 == 3) {
        update.topSelling = !existing.topSelling;
      }
      await productModel.findByIdAndUpdate(id,
        {
          $set: update
        }
      )
      return res.status(201).json({ msg: "product update successful...😊", success: true });
    } catch (error) {
      return res.status(501).json({ msg: "Internal Server Error...", success: false });
    }
  },
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await productModel.findById(id);
      if (!product) {
        return res.status(301).json({ msg: "product not found...", success: false });
      }
      if (product.thumbnail && !isRemoteUrl(product.thumbnail)) {
        const filePath = path.join(__dirname, "..", "public", "images", "product", product.thumbnail);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      if (product.images?.length) {
        for (const img of product.images) {
          if (isRemoteUrl(img)) continue;
          const filePath = path.join(__dirname, "..", "public", "images", "product", img);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      }
      await productModel.findByIdAndDelete(id);
      return res.status(201).json({ msg: "product delete successful...", success: true });
    } catch (error) {
      console.log(error)
      return res.status(501).json({ msg: "Internal Server Error...", success: false });
    }
  },
  async editProduct(req, res) {
    try {
      const { id } = req.params;
      const existing = await productModel.findById(id);
      if (!existing) {
        return res.status(301).json({ msg: "product not found...", success: false });
      }
      let thumbnail = existing.thumbnail;
      if (req.files?.thumbnail) {
        if (existing.thumbnail && !isRemoteUrl(existing.thumbnail)) {
          const oldThumb = path.join(__dirname, "..", "public", "images", "product", existing.thumbnail);
          if (fs.existsSync(oldThumb)) {
            fs.unlinkSync(oldThumb);
          }
        }
        thumbnail = await savefile(req.files.thumbnail);
      }

      let images = existing.images || [];
      if (req.files?.images) {
        if (existing.images?.length) {
          existing.images.forEach((img) => {
            if (isRemoteUrl(img)) return;
            const filePath = path.join(__dirname, "..", "public", "images", "product", img);
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          });
        }
        images = await Promise.all(
          getImageFiles(req.files.images).map((img) => savefile(img))
        );
      }

      const update = {
        name: req.body.name ?? existing.name,
        slug: req.body.slug ?? existing.slug,
        shortDescription: req.body.shortDescription ?? existing.shortDescription,
        longDescription: req.body.longDescription ?? existing.longDescription,
        originalPrice: Number(req.body.originalPrice ?? existing.originalPrice),
        discountPercentage: Number(req.body.discountPercentage ?? existing.discountPercentage),
        finalPrice: Number(req.body.finalPrice ?? existing.finalPrice),
        categoryId: req.body.categoryId ?? existing.categoryId,
        BrandId: req.body.BrandId ?? existing.BrandId,
        colors: req.body.colors ? JSON.parse(req.body.colors) : existing.colors,
        stock: req.body.stock !== undefined ? parseBool(req.body.stock, existing.stock) : existing.stock,
        topSelling: req.body.topSelling !== undefined ? parseBool(req.body.topSelling, existing.topSelling) : existing.topSelling,
        status: req.body.status !== undefined ? parseBool(req.body.status, existing.status) : existing.status,
        thumbnail,
        images,
      };
      await productModel.findByIdAndUpdate(id, {
        $set: update,
      })
      return res.status(201).json({ msg: "Product Update Successfull...😊", success: true });

    } catch (error) {
      console.log("EDIT PRODUCT ERROR:", error);
      return res.status(500).json({
        msg: error.message || "Internal Server Error..",
        success: false,
      });
    }
  }

}

module.exports = productController;