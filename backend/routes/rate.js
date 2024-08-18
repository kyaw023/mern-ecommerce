const express = require("express");
const RatingController = require("../controllers/RatingController");

const router = express.Router();

router.get("", RatingController.getRating);
router.post("", RatingController.createRating);
router.patch("/:id", RatingController.editRating);
router.delete("/:id", RatingController.deleteRating);

module.exports = router;
