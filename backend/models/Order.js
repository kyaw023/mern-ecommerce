const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
  totalAmount: { type: Number, required: true },
  shippingAddress: {
    email: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
    phone: { type: String, required: true },
    deliveryMethod: {
      type: String,
      enum: ["standard", "express"],
      default: "standard",
    },
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"], // Added enum for paymentStatus
    default: "pending",
  },
  deliveryStatus: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  date: { type: Date, default: Date.now() },
  coupon: { type: String }, // Added coupon and discount fields
  discountAmount: { type: Number, default: 0 },
  trackingNumber: { type: String }, // Added tracking number field
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
