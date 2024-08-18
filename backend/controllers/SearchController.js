const mongoose = require("mongoose");
const Products = require("../models/Products");
const Order = require("../models/Order");
const Category = require("../models/Category");
const Brand = require("../models/Brand");

const SearchController = {
  search: async (req, res) => {
    try {
      const searchQuery = req.query.q ? req.query.q.trim().toLowerCase() : "";
      const brands = req.query.brand
        ? req.query.brand
            .split(",")
            .map((b) => b.trim())
            .filter(Boolean)
        : [];
      const categories = req.query.category
        ? Array.isArray(req.query.category)
          ? req.query.category.map((c) => c.trim()).filter(Boolean)
          : [req.query.category.trim()]
        : [];

      // Initialize filter conditions and search condition
      let filterConditions = [];
      let searchCondition = {};

      // Handle brand filter
      if (brands.length > 0) {
        filterConditions.push({
          "brandDetails.name": {
            $in: brands.map((brand) => new RegExp(brand, "i")),
          },
        });
      }

      // Handle category filter
      if (categories.length > 0) {
        filterConditions.push({
          "categoryDetails.name": {
            $in: categories.map((category) => new RegExp(category, "i")),
          },
        });
      }

      // Create search condition
      searchCondition = {
        $or: [
          { name: { $regex: new RegExp(searchQuery, "i") } },
          { description: { $regex: new RegExp(searchQuery, "i") } },
        ],
      };

      // Combine search condition with filter conditions
      const combinedConditions = {
        $and: [
          ...(Object.keys(searchCondition).length ? [searchCondition] : []),
          ...filterConditions,
        ],
      };

      // Determine sorting criteria
      let sortCriteria = {};
      const sortOption = req.query.sort;

      switch (sortOption) {
        case "newest":
          sortCriteria = { createdAt: -1 };
          break;
        case "price_low_to_high":
          sortCriteria = { price: 1 };
          break;
        case "price_high_to_low":
          sortCriteria = { price: -1 };
          break;
        default:
          sortCriteria = { createdAt: -1 }; // Default sort by newest if no sort option is provided
      }

      // Perform aggregation query with sorting and optional pagination
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const skip = (page - 1) * limit;

      const results = await Products.aggregate([
        {
          $lookup: {
            from: "brands",
            localField: "brand",
            foreignField: "_id",
            as: "brandDetails",
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "categoryDetails",
          },
        },
        {
          $unwind: { path: "$brandDetails", preserveNullAndEmptyArrays: true },
        },
        {
          $unwind: {
            path: "$categoryDetails",
            preserveNullAndEmptyArrays: true,
          },
        },
        { $match: combinedConditions },
        { $sort: sortCriteria }, // Apply sorting
        { $skip: skip }, // Apply pagination
        { $limit: limit }, // Apply pagination
      ]);

      res.json(results);
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: err.message });
    }
  },
  searchOrder: async (req, res) => {
    const status = req.query.status;

    try {
      // Validate status
      const validStatuses = ["pending", "shipped", "delivered", "cancelled"];
      console.log(status && !validStatuses.includes(status));
      if (status && !validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      // Build the query object
      let query = {};
      if (status) {
        query.deliveryStatus = status; // You can change to deliveryStatus if needed
      }

      // Find orders based on status
      const orders = await Order.find(query).populate({
        path: "products.product",
        model: "Products",
      });

      if (!orders || orders.length === 0) {
        return res
          .status(404)
          .json({ message: "No orders found for the given status" });
      }

      return res.json(orders);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },
  searchCategory: async (req, res) => {
    const categoryName = req.query.name;

    console.log(categoryName);

    try {
      const category = await Category.find({
        name: { $regex: categoryName, $options: "i" },
        status: "active", // Only search active categories
      }).select("name description status");

      if (!category || category.length === 0) {
        return res
          .status(404)
          .json({ message: "No Category found for the given status" });
      }

      return res.json(category);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },
  searchBrand: async (req, res) => {
    const brandName = req.query.name;

    try {
      const brand = await Brand.find({
        name: { $regex: brandName, $options: "i" },
      });

      if (!brand || brand.length === 0) {
        return res
          .status(404)
          .json({ message: "No brand found for the given status" });
      }

      return res.json(brand);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  },
};

module.exports = SearchController;
