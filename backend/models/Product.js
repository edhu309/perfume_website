const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["woody", "fresh", "oriental", "floral", "citrus", "spicy"],
      lowercase: true,
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: 0,
      default: 0,
    },
    sections: {
      type: [String],
      enum: ["featured", "explore", "discover"],
      default: ["featured"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
