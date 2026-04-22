const { getBrand, createBrand, deleteBrands,updateBrands, editBrands } = require('../controllers/brand.controller');

const brandRoutes = require('express').Router();
const fileUpload = require('express-fileupload');
const authMiddleware = require('../middleware/authmiddleware');

brandRoutes.get('/get/:id?',getBrand)
brandRoutes.post('/create',authMiddleware,fileUpload({createParentPath: true}),createBrand)
brandRoutes.delete('/delete/:id',deleteBrands)
brandRoutes.patch('/update/:id',updateBrands)
brandRoutes.put('/edit/:id',fileUpload({createParentPath: true}),editBrands)

module.exports = brandRoutes;