const { getBrand, createBrand, deleteBrands,updateBrands, editBrands } = require('../controllers/brand.controller');

const brandRoutes = require('express').Router();
const fileUpload = require('express-fileupload');
const authMiddleware = require('../middleware/authmiddleware');
const fileUploadOptions = require('../utility/fileUploadOptions');

brandRoutes.get('/get/:id?',getBrand)
brandRoutes.post('/create',authMiddleware,fileUpload(fileUploadOptions),createBrand)
brandRoutes.delete('/delete/:id',deleteBrands)
brandRoutes.patch('/update/:id',updateBrands)
brandRoutes.put('/edit/:id',fileUpload(fileUploadOptions),editBrands)

module.exports = brandRoutes;