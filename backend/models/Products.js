const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 0) throw new Error("Negative price is not allowed.");
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: [0, "Stock cannot be less than 0."],
    },
    images: {
      type: String,
    },
    subImages: {
      type: [String], // Array of strings to store URLs of sub-images
      validate(arr) {
        if (!arr.every((url) => typeof url === "string")) {
          throw new Error("All sub-images must be URLs (strings).");
        }
      },
    },

    averageRating: { type: Number, default: 1 },
  },
  { timestamps: true }
);

ProductSchema.pre("save", function (next) {
  this.name = this.name.toLowerCase();
  this.description = this.description.toLowerCase();

  next();
});

module.exports = mongoose.model("Products", ProductSchema);
