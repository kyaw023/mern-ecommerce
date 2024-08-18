const Order = require("../models/Order");
const Stripe = require("stripe");
const Products = require("../models/Products");

const { default: mongoose } = require("mongoose");
const stripe = Stripe(
  "sk_test_51Pj0KH2Kq26wKYxVZI1WG2jhvKARRCrdeasULxYpBgAfY8cxwjUpTKY41zQYijhIYPTVc8Q4v7NpRyQZtl2R0wDx00bbcp5LXh"
);

const OrderController = {
  getOrderByUser: async (req, res) => {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ msg: "Not Valid User Id" });
    }

    try {
      // Find orders by user ID and populate the products field
      const orders = await Order.find({ user: userId }).populate({
        path: "products.product",
        model: "Products",
      });

      if (!orders || orders.length === 0) {
        return res
          .status(404)
          .json({ message: "No orders found for this user." });
      }

      return res.json(orders);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getOrderById: async (req, res) => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Not Valid User Id" });
      }
      const order = await Order.findById(id).populate({
        path: "products.product",
        model: "Products",
      });

      return res.json(order);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msg: "Internal Server Error", error: error.message });
    }
  },

  createOrder: async (req, res) => {
    const frontend_url = "http://localhost:5173";
    try {
      const { user, products, totalAmount, shippingAddress } = req.body;

      if (!products || products.length === 0) {
        return res.status(400).json({ message: "No order items" });
      }

      const order = await Order.create({
        user,
        products,
        totalAmount,
        shippingAddress,
      });

      const line_items = products.map((product) => {
        const priceInCents = parseInt(product?.product.price * 100, 10); // Convert to integer

        if (isNaN(priceInCents) || priceInCents <= 0) {
          throw new Error(`Invalid price for product: ${product.name}`);
        }

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.product.name,
            },
            unit_amount: priceInCents,
          },
          quantity: product.quantity,
        };
      });

      // Add delivery charges
      line_items.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Delivery Charges",
          },
          unit_amount: shippingAddress.deliveryMethod == "express" ? 1600 : 500, // Assuming delivery charges are $2.00
        },
        quantity: 1,
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"], // Specify allowed payment methods
        line_items: line_items,
        mode: "payment",
        success_url: `${frontend_url}/verify?success=true&orderId=${order._id}`,
        cancel_url: `${frontend_url}/verify?success=false&orderId=${order._id}`,
      });

      return res.json({ success: true, session_url: session.url });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msg: "Internal Server Error", error: error.message });
    }
  },

  updateOrder: async (req, res) => {
    const { orderId, success } = req.body;
    try {
      if (success == "true") {
        if (!mongoose.Types.ObjectId.isValid(orderId)) {
          return res.status(400).json({ msg: "Not Valid Order Id" });
        }

        const order = await Order.findById(orderId);

        if (!mongoose.Types.ObjectId.isValid(order)) {
          return res.status(400).json({ msg: "Not Found Order" });
        }

        await Order.findByIdAndUpdate(orderId, {
          paymentStatus: "completed",
        });

        for (const item of order.products) {
          const product = await Products.findById(item.product);

          if (!product) {
            throw new Error(`Product not found: ${item.product}`);
          }

          if (product.stock < item.quantity) {
            throw new Error(
              `Not enough stock for product: ${product.name}. Available: ${product.stock}, Required: ${item.quantity}`
            );
          }

          product.stock -= item.quantity;
          await product.save();
        }
        return res.json({ success: success, msg: "paid is successs" });
      } else {
        await Order.findByIdAndDelete(orderId);
        return res.json({ success: fail, msg: "paid is failed" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msg: "Internal Server Error", error: error.message });
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Not Valid Order Id" });
      }

      const order = await Order.findById(id);

      if (!mongoose.Types.ObjectId.isValid(order)) {
        return res.status(400).json({ msg: "Not Found Order" });
      }

      await Order.findByIdAndDelete(id);
      return res.json({ msg: "Order have been deleted" });

      
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ msg: "Internal Server Error", error: error.message });
    }
  },
};

module.exports = OrderController;
