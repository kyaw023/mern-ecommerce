const express = require("express");
const SearchController = require("../controllers/SearchController");

const router = express.Router();

router.get("", SearchController.search);
router.get("/search-order", SearchController.searchOrder);
router.get("/search-category", SearchController.searchCategory);
router.get("/search-brand", SearchController.searchBrand);

module.exports = router;
