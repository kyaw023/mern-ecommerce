const { validationResult } = require("express-validator");

const handleErrorMessage = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.mapped() });
  } else {
    next();
  }
};

module.exports = handleErrorMessage;
