
const Razorpay = require('razorpay');
const CartModel = require("../models/cart.model");
const orderModel = require("../models/order.model");

var instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
});

const crypto = require('crypto')

const orderController = {
    async orderSuccess(req, res) {
        try {
            const { order_id, user_id, razorpay_response } = req.body
            const order = await orderModel.findById(order_id);
            if (!order) {
                return res.send({ msg: "Order not found", status: 'error' });
            }
            if (order.order_status == 1) {
                return res.send({ msg: "Order already paid", status: 'error' });
            }
            const generated_signature =
                crypto
                    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
                    .update(razorpay_response.razorpay_order_id + "|" + razorpay_response.razorpay_payment_id)
                    .digest("hex");
            if (generated_signature !== razorpay_response.razorpay_signature) {
                return res.send({ msg: "Payment verification failed", status: 'error' });
            }
            order.payment_mode = 1;
            order.order_status = 1;
            order.razorpay_payment_id = razorpay_response.razorpay_payment_id;
            await order.save();
            await CartModel.deleteMany({ user_id });
            res.send({ message: "Order placed succesfully", status: 'success', order_id: order._id });

        } catch (error) {
            console.log(error)
        }

    },
    async orderplace(req, res) {
        try {
            const { userId, payment_mode, shipping_details } = req.body;
            const cart = await CartModel.find({ user_id: userId }).populate('product_id', 'finalPrice _id');
            const productDetails = cart.map((item) => ({
                product_id: item.product_id._id,
                qnty: item.qnty,
                price: item.product_id.finalPrice,
                total: item.product_id.finalPrice * item.qnty
            }));

            const total_amount = productDetails.reduce((total, item) => total + item.total, 0);
            const order = await orderModel.create({
                user_id: userId,
                product_Details: productDetails,
                order_total: total_amount,
                payment_mode,
                order_status: 0,
                shipping_details
            });

            if (payment_mode == 0) {
                await CartModel.deleteMany({ user_id: userId });
                order.order_status = 1
                await order.save();
                return res.status(201).json({
                    msg: "COD Order placed successfully",
                    success: true,
                    order_id: order._id
                });

            } else {
                var options = {
                    amount: total_amount * 100,
                    currency: "INR",
                    receipt: String(order._id)
                };

                instance.orders.create(options, async function (err, razorpayorder) {
                    if (err) {
                        return res.status(400).json({ msg: "Order not created", success: false });
                    } else {
                        order.razorpay_order_id = razorpayorder.id;
                        await order.save();
                        return res.status(201).json({
                            msg: "Razorpay order created",
                            success: true,
                            order_id: order._id,
                            razorpay_order_id: razorpayorder.id,
                        });
                    }
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: "Server error", success: false });
        }
    },
    async findOrder(req, res) {
        try {
            const { id } = req.params;
            const orderId = await orderModel.findById(id);
            if (!orderId) {
                return res.status(404).json({ msg: "Order not found with this ID...", success: false });
            }
            return res.status(201).json({ msg: "Order Found...", success: true });
        } catch (error) {
            console.log(error)
            return res.status(400).json({ msg: "Please enter a valid order ID....", success: false });
        }
    },
    async getAllOrder(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ msg: "Id not exist...", success: false });
        }

        const orders = await orderModel
            .find({ user_id: id })
            .populate({
                path: 'product_Details.product_id',
                select: 'name',
            });

        const formattedOrders = orders.map(order => ({
            ...order.toObject(),
            createdAt: new Date(order.createdAt).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            }),
        }));

      
        return res.status(200).json({
            success: true,
            msg: "Order fetched successfully",
            order: formattedOrders,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error...", success: false });
    }
}

};

module.exports = orderController;
