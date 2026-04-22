const { orderplace, orderSuccess, findOrder, getAllOrder } = require('../controllers/order.controller');
const authMiddleware = require('../middleware/authmiddleware');

const orderRoutes = require('express').Router();

orderRoutes.post('/order-place',orderplace)
orderRoutes.get('/order-get/:id?',getAllOrder)
orderRoutes.post('/order-success',authMiddleware,orderSuccess)
orderRoutes.get('/order-find/:id',findOrder)

module.exports = orderRoutes;