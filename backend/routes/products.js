const express = require("express");

const ProductControllers = require("../controllers/ProductControllers");

const router = express.Router();

router.get("", ProductControllers.getProducts);
router.get("/by-category", ProductControllers.getProductsByCategory);
router.get("/popular", ProductControllers.getPopularProducts);
router.get("/:id", ProductControllers.getSingleProduct);

module.exports = router;
