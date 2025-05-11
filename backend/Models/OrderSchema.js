const mongoose = require("mongoose");

// Define the Shipping Address Schema
const shippingAddressSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
});

// Define the Order Item Schema as an embedded subdocument
// Note the extra "orderId" field that will store the parent's _id
const orderItemSchema = new mongoose.Schema({
  // orderId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Order",
  //   default: null, // Will be set after order creation
  // },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
      required: [true, "Image url is required...!"],
    },
  },
});

// Define the Order Schema
const orderSchema = new mongoose.Schema(
  {
    // Reference to the user who placed the order
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Embedded order items array using the orderItemSchema
    orderItems: [orderItemSchema],
    shippingAddress: shippingAddressSchema,
    paymentMethod: {
      type: String,
      // enum: ["Cash on Delivery", "Card Payment"],
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
    },
    taxPrice: { type: Number, default: 0.0 },
    shippingPrice: { type: Number, default: 0.0 },
    totalPrice: { type: Number, default: 0.0 },
    isPaid: { type: Boolean, default: false },
    itemsPrice: { type: Number },
    paidAt: { type: Date },
    orderStatus: { type: String, default: "Pending" },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
