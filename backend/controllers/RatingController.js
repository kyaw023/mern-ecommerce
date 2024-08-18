const { default: mongoose } = require("mongoose");
const Rating = require("../models/Rating");
const Products = require("../models/Products");

const RatingController = {
  getRating: (req, res) => {
    return res.json({ msg: " Rating" });
  },
  createRating: async (req, res) => {
    try {
      const { user, product, rating } = req.body;

      if (!mongoose.Types.ObjectId.isValid(user)) {
        return res.status(400).json({ msg: "Not Valid User Id" });
      }

      if (!mongoose.Types.ObjectId.isValid(product)) {
        return res.status(400).json({ msg: "Not Valid Product Id" });
      }

      await Rating.create({ user, product, rating });

      const productRating = await Rating.find({ product: product });

      const averageRating =
        productRating.reduce((pv, cv) => pv + cv.rating, 0) /
        productRating.length;

      console.log(averageRating);

      const updateProduct = await Products.findByIdAndUpdate(
        product,
        {
          averageRating,
        },
        { new: true }
      );
      return res.json(updateProduct);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internet Server Error" });
    }
  },
  editRating: (req, res) => {
    return res.json({ msg: "edit Rating" });
  },
  deleteRating: (req, res) => {
    return res.json({ msg: "delete Rating" });
  },
};

module.exports = RatingController;
