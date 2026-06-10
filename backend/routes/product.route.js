const { getProduct, createProduct,updateProduct,deleteProduct,editProduct } = require('../controllers/product.controller');

const productRoutes = require('express').Router();
const fileUpload = require('express-fileupload');
const authMiddleware = require('../middleware/authmiddleware');
const fileUploadOptions = require('../utility/fileUploadOptions');

productRoutes.get('/get/:id?', getProduct)
productRoutes.post('/create', authMiddleware, fileUpload(fileUploadOptions), createProduct)
productRoutes.patch('/update/:id', updateProduct)
productRoutes.delete('/delete/:id', deleteProduct)
productRoutes.put('/edit/:id', fileUpload(fileUploadOptions), editProduct)

module.exports = productRoutes;