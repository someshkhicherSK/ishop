const cartRoutes = require('express').Router();
const { moveToDb, addToCart, removeToCart, qntyHandel } = require('../controllers/cart.controller');

cartRoutes.post('/snyc',moveToDb);
cartRoutes.post('/add-to-cart',addToCart);
cartRoutes.delete('/remove-to-cart/:userId/:productId',removeToCart);
cartRoutes.patch('/qnty-manage/:userId/:productId/:flag',qntyHandel);

module.exports = cartRoutes;
