const express = require("express");

const AdminControllers = require("../controllers/AdminControllers");

const router = express.Router();

const upload = require("../helper/upload");
const handleErrorMessage = require("../middlewares/handleErrorMessage");
const { body } = require("express-validator");
const multer = require("multer");

router.get("/users", AdminControllers.getUsers);
router.post("/:id/users", AdminControllers.createUsers);
router.patch("/:id/users", AdminControllers.updateUsers);
router.delete("/:id/users", AdminControllers.deleteUsers);

router.post("/products", AdminControllers.createProduct);
router.post(
  "/:id/uploadSubImages",
  [
    upload.array("subImages", 5),
    body("subImages").custom((value, { req }) => {
      if (!req.files || req.files.length === 0) {
        throw new Error("At least one photo is required");
      }
      req.files.forEach((file) => {
        if (!file.mimetype.startsWith("image")) {
          throw new Error("All files must be images");
        }
      });
      return true;
    }),
  ],
  handleErrorMessage,
  AdminControllers.uploadSubImage
);
router.post(
  "/:id/upload",
  (req, res, next) => {
    upload.single("photo")(req, res, function (err) {
      console.log(err);
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }

      next();
    });
  },
  [
    body("photo").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Photo is required");
      }
      if (!req.file.mimetype.startsWith("image")) {
        throw new Error("Photo must be image");
      }

      return true;
    }),
  ],
  handleErrorMessage,
  AdminControllers.uploadImage
);

router.delete("/:id/products", AdminControllers.deleteProduct);
router.patch("/:id/products", AdminControllers.updateProduct);

router.post("/categories", AdminControllers.createCategories);
router.patch("/:id/categories", AdminControllers.updateCategories);
router.delete("/:id/categories", AdminControllers.deleteCategories);

router.get("/list-order", AdminControllers.getAllOrder);
router.patch("/update-order/:id", AdminControllers.updateAdminOrder);
router.get("/delivery-order", AdminControllers.getDeliveryOrder);

module.exports = router;
