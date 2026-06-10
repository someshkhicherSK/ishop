const brandModel = require('../models/brand.model');
const productModel = require("../models/product.model");
const { uploadImage, isRemoteUrl } = require('../utility/uploadImage');
const { resolveBrandImage } = require('../utility/resolveImageUrl');
const path = require('path');
const fs = require('fs')
const brandController = {
    async getBrand(req, res) {
        const { id } = req.params;
        try {
            if (id) {
                const brand = await brandModel.findById(id);
                if (!brand) {
                    return res.status(404).json({ msg: "Brand not found", success: false });
                }
                return res.status(200).json({
                    msg: "brand get successful...",
                    success: true,
                    getBrand: resolveBrandImage(brand),
                });
            }

            const brands = await brandModel.find();
            const data = await Promise.all(
                brands.map(async (brand) => {
                    const productCount = await productModel.countDocuments({ BrandId: brand._id });
                    return {
                        ...resolveBrandImage(brand),
                        productCount,
                    };
                })
            );

            return res.status(200).json({ msg: "Data Get Successfully...", data });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Internal Server error...", success: false })
        }
    },
    async createBrand(req, res) {
        const { name, slug, status } = req.body;
        const brandLogo = req.files?.logo;


        if (!name || !slug || !brandLogo) {
            console.log(name,slug,status,brandLogo)
            return res.status(301).json({ msg: "All Fileds Are Required...😂", success: false });

        }
        try {
            const existing = await brandModel.findOne({ name });
            if (existing) {
                return res.status(409).json({ msg: "Brand name must be unique...😥", success: false });
            }

            const logo = await uploadImage(brandLogo, "brands");

            const createData = await brandModel.create({
                name,
                slug,
                status,
                logo,
            });

            return res.status(201).json({ msg: "Brand Create Successfull...", success: true, createData });
        } catch (error) {
            console.log(error);
            return res.status(501).json({ msg: "Internal Server error...", success: false })
        }
    },
    async deleteBrands(req, res) {
        const { id } = req.params;
        try {
            const exiting = await brandModel.findById(id);
            if (!exiting) {
                return res.status(301).json({ msg: "Data Not Found...", success: false })
            }
            if (exiting.logo && !isRemoteUrl(exiting.logo)) {
                const logoPath = path.join(__dirname, "..", "public", "images", "brands", exiting.logo);
                if (fs.existsSync(logoPath)) {
                    fs.unlinkSync(logoPath);
                }
            }
            await brandModel.findByIdAndDelete(id);
            return res.status(201).json({ msg: "Data delete successful...", success: true })
        } catch (error) {
            console.log(error)
            return res.status(501).json({ msg: "Internal Server Error...", success: false });
        }
    },
    async updateBrands(req, res) {
        const { id } = req.params;
        try {
            const exiting = await brandModel.findById(id);
            if (!exiting) {
                return res.status(301).json({ msg: "data not found...", success: false });
            }
            await brandModel.findByIdAndUpdate(id, {
                $set: { status: !exiting.status }
            })
            return res.status(201).json({ msg: "data update successful...", success: false });
        } catch (error) {
            return res.status(501).json({ msg: "Interan;l Server Error...", success: true });
        }
    },
    async editBrands(req, res) {
        const { id } = req.params;
        const { name, slug, status } = req.body;
        const brandLogo = req.files?.logo;
       
        if (!name || !slug) {
            return res.status(301).json({ msg: "all fileds are required...", success: false });
        }
        try {
            const existing = await brandModel.findById(id);
            if (!existing) {
                return res.status(305).json({ msg: "Brands not found", success: false });
            }
            const update = {};
            if (name) update.name = name;
            if (slug) update.slug = slug;
            if (status) update.status = status;
            if (brandLogo) {
                update.logo = await uploadImage(brandLogo, "brands");
                const editData = await brandModel.updateOne(
                    { _id: id },
                    { $set: update }
                );
                return res.status(201).json({ msg: "Brands updated successfully 😋", success: true, data: editData });
            } else {
                const editData = await brandModel.updateOne(
                    { _id: id },
                    { $set: update }
                );
                return res.status(201).json({ msg: "Brand updated successfully 😋", success: true, data: editData });
            }
        } catch (error) {
            return res.status(500).json({ msg: "Internal Server Error...😪", success: false });
        }
    }
}

module.exports = brandController;