const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    bio: {
      type: String,
    },
    favoriteProducts: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
    ],
    themePreference: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "system",
    },
  },
  { timestamps: true }
);

UserSchema.statics.register = async function (name, email, password) {
  const userExisted = await this.findOne({ email });

  if (userExisted) {
    throw new Error("Email already Existed");
  }

  const salt = await bcrypt.genSalt();

  const hashValue = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hashValue,
  });

  return user;
};

UserSchema.statics.login = async function (email, password) {
  const userExisted = await this.findOne({ email });

  console.log(userExisted);

  if (!userExisted) {
    throw new Error("User not found");
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    userExisted.password
  );

  if (!isPasswordCorrect) {
    throw new Error("Password is not correct");
  }

  return userExisted;
};

module.exports = mongoose.model("Users", UserSchema);
