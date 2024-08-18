const express = require("express");
const BrandController = require("../controllers/BrandController");

const router = express.Router();

router.post("", BrandController.createBrand);
router.get("", BrandController.getBrand);
router.patch("/:id", BrandController.editBrand);
router.delete("/:id", BrandController.deleterand);

module.exports = router;
