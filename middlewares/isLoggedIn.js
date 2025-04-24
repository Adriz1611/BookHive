const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new Error();

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch {
    req.flash("error", "Please log in first.");
    res.redirect("/login");
  }
  
};
