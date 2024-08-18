const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

module.exports = createToken;
