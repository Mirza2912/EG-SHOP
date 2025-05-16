// Models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required...!"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required...!"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required...!"],
      maxLength: [8, "Price cannot exceed 8 characters...!"],
    },
    stock: {
      type: Number,
      required: [true, "Product stock is required...!"],
      default: 1,
    },
    discount: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // References the Category model
      required: true,
    },
    images: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
          required: [true, "Image url is required...!"],
        },
      },
    ],
    isReturnAble: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    productDetails: {
      type: mongoose.Schema.Types.Mixed, //scalable field
      default: {},
    },
    calories :{
      type: Number,
      default: 0,
    }, 
  },
  { timestamps: true }
);

// // Pre-save middleware to update the updatedAt field
// productSchema.pre("save", function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

module.exports = mongoose.model("Product", productSchema);
