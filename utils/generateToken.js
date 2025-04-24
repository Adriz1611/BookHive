const jwt = require("jsonwebtoken");

exports.generateToken = (user) =>
  jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY, {
    expiresIn: "7d",
  });
