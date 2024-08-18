const mongoose = require("mongoose");
const reactionSchema = new mongoose.Schema(
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
    type: {
      type: String,
      enum: ["👍", "❤️", "😂", "😮", "😢", "😡"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reaction", reactionSchema);
