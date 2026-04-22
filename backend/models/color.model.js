const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "color name is required"],
      unique: true,
      minlength: [3, "color name must be at least 3 characters"],
      maxlength: [50, "color name must not exceed 50 characters"],
    },

    slug: {
      type: String,
      trim: true,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
    },
    hexacode: {
      type: String,
      trim: true,
      default: null,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("color", colorSchema);
