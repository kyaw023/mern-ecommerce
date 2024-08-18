const { default: mongoose } = require("mongoose");
const Products = require("../models/Products");
const Review = require("../models/Review");
const Users = require("../models/Users");

const ReviewController = {
  getReviews: async (req, res) => {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Not Valid Product Id" });
      }

      const checkProductExisted = await Products.findById(id);

      if (!checkProductExisted) {
        return res.status(400).json({ msg: "Not Product Found" });
      }

      const reviews = await Review.find({ productId: id })
        .populate("userId")
        .populate({
          path: "replies",
          populate: { path: "userId" },
        });
      return res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while fetching reviews." });
    }
  },
  writeReviews: async (req, res) => {
    try {
      const { productId, userId, reviews } = req.body;

      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ msg: "Not Valid Product Id" });
      }
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ msg: "Not Valid User Id" });
      }

      const checkProductExisted = await Products.findById(productId);

      if (!checkProductExisted) {
        return res.status(400).json({ msg: "Not Product Found" });
      }

      const checkUserExisted = await Users.findById(userId);

      if (!checkUserExisted) {
        return res.status(400).json({ msg: "Not Product Found" });
      }

      const comments = await Review.create({
        productId,
        userId,
        text: reviews,
      });

      const populatedReview = await comments.populate("userId");

      return res.json(populatedReview);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internet Server Error" });
    }
  },
  editReviews: async (req, res) => {
    try {
      const id = req.params.id;

      const { text } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Not Valid User Id" });
      }

      const updateReviews = await Review.findByIdAndUpdate(
        id,
        {
          text,
        },
        {
          new: true,
        }
      );

      return res.json(updateReviews);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internet Server Error" });
    }
  },
  deleteReviews: async (req, res) => {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Not Valid User Id" });
      }

      const updateReviews = await Review.findByIdAndDelete(id);
      return res.json(updateReviews);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internet Server Error" });
    }
  },
};

module.exports = ReviewController;
