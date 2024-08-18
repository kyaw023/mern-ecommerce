const { default: mongoose } = require("mongoose");
const Products = require("../models/Products");
const Users = require("../models/Users");

const removeFile = require("../helper/removeFile");
const createToken = require("../helper/createToken");
const Category = require("../models/Category");
const Order = require("../models/Order");

const AdminController = {
  createProduct: async (req, res) => {
    try {
      const { name, description, price, brand, stock, category } = req.body;

      const product = await Products.create({
        name,
        description,
        price,
        brand,
        stock,
        category,
      });

      console.log(product);
      return res.json(product);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internet Server Error" });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Not Valid Id" });
      }

      const checkProductExisted = await Products.findById(id);

      if (!checkProductExisted) {
        return res.json({ msg: "No Products Found!" });
      }

      const products = await Products.findByIdAndDelete(id);

      await removeFile(__dirname + "/../public" + products?.images);

      return res.json(products);
    } catch (error) {
      return res.status(500).json({ msg: "Internet Server Error" });
    }
  },

  updateProduct: async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Not Valid Id" });
    }

    const existedProducts = await Products.findById(id);

    if (!existedProducts) {
      return res.json({ msg: "No Products Found!" });
    }

    console.log(req.body);

    if (existedProducts.images && req.file && req.file.filename) {
      await removeFile(__dirname + "/../public" + existedProducts.images);
    }

    const products = await Products.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    console.log(products);
    if (!products) {
      return res.status(404).json({ msg: "No Recipe Found!" });
    }
    return res.json(products);
  },

  uploadImage: async (req, res) => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Not Valid Id" });
      }

      const product = await Products.findByIdAndUpdate(
        id,
        {
          images: "/" + req.file.filename,
        },
        { new: true }
      );

      return res.json(product);
    } catch (error) {
      return res.status(500).json({ msg: "Internet Server Error" });
    }
  },
  uploadSubImage: async (req, res) => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Not Valid Id" });
      }

      const subImages = req.files.map((file) => "/" + file?.filename);

      const product = await Products.findByIdAndUpdate(
        id,
        {
          subImages: subImages,
        },
        { new: true }
      );

      return res.json(product);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internet Server Error" });
    }
  },
  getUsers: async (req, res) => {
    const users = await Users.find();

    return res.json(users);
  },
  createUsers: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const user = await Users.register(name, email, password);

      const token = createToken(user._id);

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });

      return res.json({ user, token });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },
  updateUsers: async (req, res) => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Invalid ID" });
      }

      console.log(req.body);

      const user = await Users.findByIdAndUpdate(id, req.body, { new: true });
      if (!user) {
        return res.status(404).json({ msg: "User Not Found" });
      }

      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  },
  deleteUsers: async (req, res) => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Invalid ID" });
      }

      const user = await Users.findByIdAndDelete(id);

      if (!user) {
        return res.status(404).json({ msg: "User Not Found" });
      }

      return res.json({ msg: "User Deleted Successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  },

  createCategories: async (req, res) => {
    try {
      const { name, description, status } = req.body;

      const category = await Category.create({
        name,
        description,
        status,
      });

      return res.json(category);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internet Server Error" });
    }
  },

  updateCategories: async (req, res) => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Invalid ID" });
      }
      console.log(req.body);
      const category = await Category.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!category) {
        return res.status(404).json({ msg: "Category Not Found" });
      }
      return res.json(category);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  },

  deleteCategories: async (req, res) => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Invalid ID" });
      }
      const category = await Category.findByIdAndDelete(id);
      if (!category) {
        return res.status(404).json({ msg: "Category Not Found" });
      }
      return res.json({ msg: "Category Deleted Successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  },

  getAllOrder: async (req, res) => {
    const orders = await Order.find({}).populate({
      path: "products.product",
      model: "Products",
    });
    console.log(orders);
    return res.json(orders);
  },
  updateAdminOrder: async (req, res) => {
    try {
      const id = req.params.id;

      console.log(id);

      console.log(req.body);

      const order = await Order.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
      });

      if (!order) {
        return res.status(404).json({ msg: "Order not found" });
      }

      return res.json(order);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  },

  getDeliveryOrder: async (req, res) => {
    const deliveredOrder = await Order.find({
      deliveryStatus: "delivered",
    }).populate({
      path: "products.product",
      model: "Products",
    });
    console.log(deliveredOrder);

    return res.json(deliveredOrder);
  },
};

module.exports = AdminController;
