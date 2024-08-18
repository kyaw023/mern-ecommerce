const { default: mongoose } = require("mongoose");
const Cart = require("../models/Cart");
const Products = require("../models/Products");

const CartController = {
  addToCart: async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;

      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ msg: "Not Valid Product Id" });
      }

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ msg: "Not Valid user Id" });
      }

      const product = await Products.findById(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.stock < quantity) {
        return res.status(400).json({ message: "Not enough stock available" });
      }

      const isExistedCart = await Cart.findOne({
        user: userId,
        product: productId,
      });

      console.log(isExistedCart);
      if (isExistedCart) {
        return res.status(400).json({ msg: "Product already existed in cart" });
      }

      const cartItem = await Cart.create({
        user: userId,
        product: productId,
        quantity,
      });

      const populatedCartItem = await Cart.findById(cartItem._id).populate(
        "product"
      );

      return res.json(populatedCartItem);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Server error" });
    }
  },

  getCart: async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Not Valid user Id" });
    }

    try {
      const cartItems = await Cart.find({ user: id }).populate("product"); // Populate product fields

      return res.json(cartItems);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Server error" });
    }
  },

  updateCart: async (req, res) => {
    const { id, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Not Valid user Id" });
    }

    const cartItem = await Cart.findById(id).populate("product");

    if (!cartItem) {
      return res.status(404).json({ msg: "Cart item not found" });
    }

    const newQuantity = cartItem.quantity + quantity;

    if (newQuantity > cartItem.product.stock) {
      return res.status(400).json({ msg: "Not enough stock available" });
    }

    if (newQuantity < 1) {
      return res.status(400).json({ msg: "Quantity cannot be less than 1" });
    }

    const updateCartItem = await Cart.findByIdAndUpdate(
      id,
      {
        quantity: newQuantity,
      },
      { new: true }
    );

    return res.json(updateCartItem);
  },

  increaseQuantity: async (req, res) => {
    try {
      const { id, quantity } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Not Valid user Id" });
      }

      const cartItem = await Cart.findById(id).populate("product");

      console.log(cartItem);

      if (!cartItem) {
        return res.status(404).json({ msg: "Cart item not found" });
      }

      const newQuantity = cartItem.quantity + quantity;

      if (newQuantity > cartItem.product.stock) {
        return res.status(400).json({ msg: "Not enough stock available" });
      }

      if (newQuantity < 1) {
        return res.status(400).json({ msg: "Quantity cannot be less than 1" });
      }

      const updateCartItem = await Cart.findByIdAndUpdate(
        id,
        {
          quantity: newQuantity,
        },
        { new: true }
      );

      return res.json(updateCartItem);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Server error" });
    }
  },

  decreaseQuantity: async (req, res) => {
    try {
      const { id, quantity } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Not Valid user Id" });
      }

      const cartItem = await Cart.findById(id).populate("product");

      console.log(cartItem);

      if (!cartItem) {
        return res.status(404).json({ msg: "Cart item not found" });
      }

      const newQuantity = cartItem.quantity - quantity;

      if (newQuantity > cartItem.product.stock) {
        return res.status(400).json({ msg: "Not enough stock available" });
      }

      if (newQuantity < 1) {
        await Cart.findByIdAndDelete(id);
        return res.json({ msg: "Your cart is deleted" });
      }

      const updateCartItem = await Cart.findByIdAndUpdate(
        id,
        {
          quantity: newQuantity,
        },
        { new: true }
      );

      return res.json(updateCartItem);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Server error" });
    }
  },

  deleteFromCart: async (req, res) => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Not Valid user Id" });
      }
      const cartItem = await Cart.findById(id).populate("product");

      if (!cartItem) {
        return res.status(404).json({ msg: "Cart item not found" });
      }

      const deletedItem = await Cart.findByIdAndDelete(id);
      return res.json(deletedItem);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Server error" });
    }
  },
};

module.exports = CartController;
