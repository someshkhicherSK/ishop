const mongoose = require("mongoose");

const shippingAddress = new mongoose.Schema({
    addressLine1: { type: String, require: true },
    addressLine2: { type: String, require: false },
    city: { type: String, require: true },
    contact: { type: String, default: null },
    state: { type: String, require: true },
    country: { type: String, require: true },
    zip: { type: String, require: true },
},
    {
        _id: false
    }

)
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        shipping_address: {
            type: [shippingAddress],
            default: []
        },
    },
    { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
