const express = require("express");
const ReviewController = require("../controllers/ReviewController");

const router = express.Router();

router.get("/:id", ReviewController.getReviews);
router.post("", ReviewController.writeReviews);
router.patch("/:id", ReviewController.editReviews);
router.delete("/:id", ReviewController.deleteReviews);

module.exports = router;
