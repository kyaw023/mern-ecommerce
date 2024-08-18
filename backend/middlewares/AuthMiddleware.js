const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const AuthMiddleware = (req, res, next) => {
  let token = req?.cookies?.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedValue) => {
      if (err) {
        return res.status(401).json({ message: "unauthenticated user" });
      } else {
        User.findById(decodedValue._id).then((user) => {
          req.user = user;
          next();
        });
      }
    });
  } else {
    return res.status(400).json({ message: " token need to provide" });
  }
};

module.exports = AuthMiddleware;
