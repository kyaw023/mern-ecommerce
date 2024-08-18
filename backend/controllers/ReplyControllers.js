const { default: mongoose } = require("mongoose");

const Review = require("../models/Review");
const Users = require("../models/Users");
const Reply = require("../models/Reply");

const ReplyController = {
  getReply: (req, res) => {
    return res.json({ msg: "get Reply" });
  },
  writeReply: async (req, res) => {
    try {
      const { reviewId, userId, text } = req.body;

      if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        return res.status(400).json({ msg: "Not Valid review Id" });
      }
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ msg: "Not Valid review Id" });
      }

      const checkReviewExisted = await Review.findById(reviewId);

      if (!checkReviewExisted) {
        return res.status(400).json({ msg: "Not Review Found" });
      }

      const checkUserExisted = await Users.findById(userId);

      if (!checkUserExisted) {
        return res.status(400).json({ msg: "Not User Found" });
      }

      const reply = new Reply({
        reviewId,
        userId,
        text,
      });

      await reply.save();

      // Populate the userId field in the newly created reply
      const populatedReply = await Reply.findById(reply._id).populate("userId");

      // Add the populated reply to the review's replies array
      checkReviewExisted.replies.push(populatedReply);
      await checkReviewExisted.save();

      return res.json(populatedReply);
    } catch (error) {
      console.error("Error writing reply:", error);
      return res
        .status(500)
        .json({ msg: "An error occurred while writing the reply." });
    }
  },

  editReply: async (req, res) => {
    try {
      const id = req.params.id;
      const { text } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Not Valid User Id" });
      }

      const updateReply = await Reply.findByIdAndUpdate(
        id,
        {
          text,
        },
        {
          new: true,
        }
      );

      return res.json(updateReply);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internet Server Error" });
    }
  },

  deleteReply: async (req, res) => {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Not Valid User Id" });
      }

      const updateReply = await Reply.findByIdAndDelete(id);
      return res.json(updateReply);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internet Server Error" });
    }
  },
};

module.exports = ReplyController;
