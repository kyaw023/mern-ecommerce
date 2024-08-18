const express = require("express");

const UserControllers = require("../controllers/UserControllers");
const upload = require("../helper/upload");
const { body } = require("express-validator");
const handleErrorMessage = require("../middlewares/handleErrorMessage");
const Users = require("../models/Users");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const router = express.Router();

router.get("/me", AuthMiddleware, UserControllers.me);
router.patch("/:id/edit", AuthMiddleware, UserControllers.editProfile);
router.post(
  "/:id/upload",
  [
    upload.single("photo"),
    body("photo").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("photo must be required");
      }
      if (!req.file.mimetype.startsWith("image")) {
        throw new Error("photo must be image");
      }
      return true;
    }),
  ],
  handleErrorMessage,
  UserControllers.uploadImage
);

router.post("/logout", UserControllers.logout);
router.post("/login", UserControllers.login);
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Email is required"),
    body("email").custom(async (value) => {
      const emailExisted = await Users.findOne({ email: value });
      if (emailExisted) {
        throw new Error("Email already existed");
      }
    }),
    body("password")
      .isLength({ min: 8 })
      .withMessage(
        "Password is required and it must be at least 8 characters long"
      ),
  ],
  handleErrorMessage,
  UserControllers.register
);

router.delete("/delete-me", UserControllers.deleteMe);
router.delete("/delete-account/:id", UserControllers.deleteAccount);
router.post("/reset-password", UserControllers.resetPassword);

router.get("/categories", UserControllers.getCategories);
router.get("/:id/favorites", UserControllers.getFavorites);
router.post("/:id/favorites", UserControllers.postFavorites);
router.delete("/:id/favorites/:productId", UserControllers.deleteFavorites);
router.put("/theme", UserControllers.setTheme);

module.exports = router;
