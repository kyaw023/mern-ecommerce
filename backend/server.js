const express = require("express");

const morgan = require("morgan");

const mongoose = require("mongoose");

const cors = require("cors");

const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");
const reviewRoutes = require("./routes/reviews");
const replyRoutes = require("./routes/reply");
const searchRoutes = require("./routes/search");
const cartRoutes = require("./routes/cart");
const ratingRoutes = require("./routes/rate");
const brandRoutes = require("./routes/brand");
const orderRoutes = require("./routes/order");

const cookieParser = require("cookie-parser");
const AuthMiddleware = require("./middlewares/AuthMiddleware");
const AdminMiddleware = require("./middlewares/AdminMiddleware");

const app = express();

require("dotenv").config();

const mongoURL =
  "mongodb+srv://kyawkhainglynn023:kyaw201218@e-commerce.obsk83d.mongodb.net/?retryWrites=true&w=majority&appName=e-commerce";

mongoose.connect(mongoURL).then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Backend server is running on port 4000");
  });
});
app.use(express.static("public"));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/products", AuthMiddleware, productRoutes);
app.use("/api/admin", AuthMiddleware, AdminMiddleware, adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", AuthMiddleware, reviewRoutes);
app.use("/api/reply", AuthMiddleware, replyRoutes);
app.use("/api/search", AuthMiddleware, searchRoutes);
app.use("/api/carts", AuthMiddleware, cartRoutes);
app.use("/api/rating", AuthMiddleware, ratingRoutes);
app.use("/api/brand", AuthMiddleware, brandRoutes);
app.use("/api/order", AuthMiddleware, orderRoutes);
