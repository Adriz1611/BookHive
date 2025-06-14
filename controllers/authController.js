
const bcrypt = require("bcryptjs");
const User = require("../models/user-model");
const { generateToken } = require("../utils/generateToken");

exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      req.flash("error", "All fields are required.");
      return res.redirect("/signup");
    }
    if (password.length < 6) {
      req.flash("error", "Password must be at least 6 characters.");
      return res.redirect("/signup");
    }

    
    if (await User.findOne({ email })) {
      req.flash("error", "Account already exists. Please log in.");
      return res.redirect("/login");
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ fullname, email, password: hash });

   
    res.cookie("token", generateToken(user), { httpOnly: true });
    res.redirect("/shop");
  } catch (err) {
    console.error(err);
    req.flash("error", "Signup failed. Please try again.");
    res.redirect("/signup");
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      req.flash("error", "Both e-mail and password are required.");
      return res.redirect("/login");
    }

    
    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error", "Account not found.");
      return res.redirect("/login");
    }

    
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      req.flash("error", "Incorrect password.");
      return res.redirect("/login");
    }

    res.cookie("token", generateToken(user), { httpOnly: true });
    res.redirect("/shop");
  } catch (err) {
    console.error(err);
    req.flash("error", "Login failed. Please try again.");
    res.redirect("/login");
  }
};
exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};
