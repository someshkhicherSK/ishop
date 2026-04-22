const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\\S+@\\S+\\.\\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["superadmin", "admin", "manager"],
      default: "admin",
    },
    status: {
      type: String,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const adminModel = mongoose.model("Admin", adminSchema);

module.exports = adminModel;
