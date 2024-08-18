const express = require("express");
const OrderController = require("../controllers/OrderController");

const router = express.Router();

router.get("/user/:userId", OrderController.getOrderByUser);

router.get("/:id", OrderController.getOrderById);
router.post("", OrderController.createOrder);
// router.patch("/:id", OrderController.updateOrder);
router.post("/verify", OrderController.updateOrder);
router.delete("/:id", OrderController.deleteOrder);

module.exports = router;
