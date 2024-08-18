const express = require("express");
const ReplyController = require("../controllers/ReplyControllers");

const router = express.Router();

router.get("/:id", ReplyController.getReply);
router.post("", ReplyController.writeReply);
router.patch("/:id", ReplyController.editReply);
router.delete("/:id", ReplyController.deleteReply);

module.exports = router;
