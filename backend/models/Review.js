const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    text: { type: String, required: true },
    // rating: { type: Number, required: true },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
    reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reaction" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
