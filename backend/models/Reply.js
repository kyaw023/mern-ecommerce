const mongoose = require("mongoose");
const replySchema = new mongoose.Schema(
  {
    reviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reply", replySchema);
