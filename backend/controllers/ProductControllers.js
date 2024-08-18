const mongoose = require("mongoose");
const Products = require("../models/Products");
const Category = require("../models/Category");

const ProductControllers = {
  getProducts: async (req, res) => {
    const limit = 8;
    const page = req.query.page || 1;

    const products = await Products.find()
      .populate("category")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createAt: -1 });

    const totalProducts = await Products.countDocuments();

    const totalPages = Math.ceil(totalProducts / limit);

    const links = {
      nextPage: page == totalPages || page > totalPages ? false : true,
      previousPage: page == 1 ? false : true,
      currentPage: page,
      paginationLinks: [],
    };

    for (let index = 0; index < totalPages; index++) {
      links.paginationLinks.push({ number: index + 1 });
    }

    const response = {
      links,
      data: products,
    };

    return res.json(response);
  },
  getSingleProduct: async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Not Valid Id" });
    }

    const product = await Products.findById(id);

    return res.json(product);
  },
  getPopularProducts: (req, res) => {
    return res.json({ msg: "Get porpular product" });
  },
  getProductsByCategory: async (req, res) => {
    try {
      const categoryName = req.query.categoryName;

      const category = await Category.findOne({ name: categoryName });

      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      const products = await Products.find({ category: category._id }).populate(
        "category"
      );

      return res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = ProductControllers;
