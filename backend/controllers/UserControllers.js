const createToken = require("../helper/createToken");
const Users = require("../models/Users");
const removeFile = require("../helper/removeFile");
const { default: mongoose } = require("mongoose");
const Products = require("../models/Products");
const Category = require("../models/Category");

const bcrypt = require("bcrypt");

const UserControllers = {
  me: async (req, res) => {
    try {
      return res.json(req.user);
    } catch (error) {
      console.log(error);
    }
  },
  deleteMe: async () => {
    const { id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Not Valid Id" });
    }

    const isUserExisted = await Users.findById(id);

    if (!isUserExisted) {
      return res.status(400).json({ msg: "User not found" });
    }

    const deletedUser = await Users.findByIdAndDelete(id);

    return res.json(deletedUser);
  },
  editProfile: async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Not Valid Id" });
    }
    const isUserExisted = await Users.findById(id);

    if (!isUserExisted) {
      return res.status(400).json({ msg: "User not found" });
    }

    if (isUserExisted?.photo && req?.file?.filename) {
      await removeFile(__dirname + "/../public" + isUserExisted.photo);
    }

    const updateUser = await Users.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.json(updateUser);
  },
  uploadImage: async (req, res) => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Not Valid Id" });
      }

      const isUserExisted = await Users.findById(id);

      if (!isUserExisted) {
        return res.status(400).json({ msg: "User not found" });
      }

      if (isUserExisted?.photo && req?.file?.filename) {
        await removeFile(__dirname + "/../public" + isUserExisted.photo);
      }

      const user = await Users.findByIdAndUpdate(
        id,
        {
          image: "/" + req.file.filename,
        },
        { new: true }
      );

      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internet Server Error" });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.login(email, password);

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
  register: async (req, res) => {
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
  logout: async (req, res) => {
    try {
      res.cookie("jwt", "", {
        maxAge: 1,
      });
      return res.json({ message: "user logout successfully" });
    } catch (e) {
      return res.status(404).json({ error: e.message });
    }
  },
  deleteAccount: async (req, res) => {
    const { id } = req.params;
    try {
      await Users.findByIdAndDelete(id);
      res.status(200).send({ message: "User account deleted successfully" });
    } catch (error) {
      res.status(500).send({ error: "Error deleting user account" });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });

      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      const salt = await bcrypt.genSalt();

      const hashCode = await bcrypt.hash(password, salt);
      user.password = hashCode;
      await user.save();
      return res.json({ msg: "password changed" });
    } catch (error) {
      console.log(error);
      return res.status(404).json({ msg: "Invalid Field" });
    }
  },
  getCategories: async (req, res) => {
    const categories = await Category.find();

    return res.json(categories);
  },
  getFavorites: async (req, res) => {
    try {
      const id = req.params.id;

      // get  productID

      // check user id is valid
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Not Valid User Id" });
      }

      // check user is loggin
      const isUserExisted = await Users.findById(id).populate(
        "favoriteProducts"
      );

      // check if existed
      if (!isUserExisted) {
        return res.json({ msg: "Not user found" });
      }

      return res.status(200).json(isUserExisted.favoriteProducts);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  postFavorites: async (req, res) => {
    const id = req.params.id;

    // check user id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Not Valid User Id" });
    }

    // check user is loggin
    const isUserExisted = await Users.findById(id);

    // check if existed
    if (!isUserExisted) {
      return res.json({ msg: "Not user found" });
    }

    // get  productID
    const { productId } = req.body;

    // check product id is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ msg: "Not Valid Product Id" });
    }

    // check if product is existed
    const isProductExisted = await Products.findById(productId);

    if (!isProductExisted) {
      return res.json({ msg: "No Product found" });
    }

    if (isUserExisted.favoriteProducts?.includes(productId)) {
      return res.status(400).json({ msg: "Product already in favorites" });
    }

    isUserExisted.favoriteProducts.push(productId);

    await isUserExisted.save();

    return res.json(isProductExisted);
  },

  deleteFavorites: async (req, res) => {
    const id = req.params.id;

    // check user id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Not Valid User Id" });
    }

    // check user is loggin
    const isUserExisted = await Users.findById(id);

    // check if existed
    if (!isUserExisted) {
      return res.json({ msg: "Not user found" });
    }

    // get  productID
    const productId = req.params.productId;

    
    // check  id is valid
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ msg: "Not Valid Product Id" });
    }

    //check if recipe is existed in recipes database
    const isProductExisted = await Products.findById(productId);

    if (!isProductExisted) {
      return res.json({ msg: "No Product found" });
    }

    // Remove product from user's favorite list
    isUserExisted.favoriteProducts = isUserExisted.favoriteProducts.filter(
      (product) => product?._id != productId
    );

    await isUserExisted.save();

    return res.json(isUserExisted.favoriteProducts);
  },

  setTheme: async (req, res) => {
    const { userId, theme } = req.body;

    try {
      const user = await Users.findByIdAndUpdate(
        userId,
        { themePreference: theme },
        { new: true }
      );
      res.json({ success: true, theme: user.themePreference });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to update theme preference" });
    }
  },
};

module.exports = UserControllers;
