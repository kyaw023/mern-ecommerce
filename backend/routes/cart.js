const express = require("express");
const CartController = require("../controllers/CartController");

const router = express.Router();

router.post("/add-cart", CartController.addToCart);
router.get("/:id/carts", CartController.getCart);
router.patch("/:id/add-cart", CartController.updateCart);
router.delete("/:id/add-cart", CartController.deleteFromCart);
router.patch("/increaseQuantity", CartController.increaseQuantity);
router.patch("/decreaseQuantity", CartController.decreaseQuantity);

module.exports = router;
