const mongoose = require("mongoose");

const productDetailsSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.ObjectId, ref: "Product", require: true },
    qnty: { type: Number, require: true },
    price: { type: Number, require: true },
    total: { type: Number, require: true }
}, {
    _id: false
})
const shppingDetailsSchema = new mongoose.Schema({
    name: { type: String },
    contact: { type: String, require: true },
    addressLine1: { type: String, require: true },
    addressLine2: { type: String },
    city: { type: String, require: true },
    state: { type: String, require: true },
    country: { type: String, require: true },
    zip: { type: Number, require: true },

}, {
    _id: false
})
const orderSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.ObjectId,ref: "User",require: true},
    product_Details: { type: [productDetailsSchema], require: true },
    order_total: { type: Number, require: true },
    payment_mode: { type: Number, require: true },
    razorpay_order_id: { type: String, default: null },
    razorpay_payment_id: { type: String, default: null },
    order_status: { type: Number, enum: [0,1, 2, 3, 4, 5, 6], default: 1 },
    shipping_details: { type: shppingDetailsSchema, require: true }
}, {
    timestamps: true
})

const orderModel = mongoose.model('Order',orderSchema);
module.exports = orderModel;