const userModel = require('../models/user.model');
const productModel = require("../models/product.model");
const orderModel = require("../models/order.model");


const dashboardController = {
    async getData(req, res) {
        const ordersCount = await orderModel.countDocuments();
        const customersCount = await userModel.countDocuments();
        const productsCount = await productModel.countDocuments();

        const revenueAgg = await orderModel.aggregate([
            { $group: { _id: null, totalRevenue: { $sum: "$order_total" } } },

        ]);

        const totalRevenue = revenueAgg[0]?.totalRevenue || 0;
        return res.status(200).json({
            orders: ordersCount,
            customers: customersCount,
            products: productsCount,
            revenue: totalRevenue,
        });
    },
}

module.exports = dashboardController;