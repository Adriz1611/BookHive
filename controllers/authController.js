const bcrypt = require("bcrypt");
const User = require("../models/user-model");
const { generateToken } = require("../utils/generateToken");

exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body; // ★ field names MUST match the form

    // 1. Already registered?
    if (await User.findOne({ email })) {
      req.flash("error", "You already have an account. Please log in.");
      return res.redirect("/login");
    }

    // 2. Hash password
    const hash = await bcrypt.hash(password, 10);

    // 3. Create user
    const user = await User.create({ fullname, email, password: hash });

    // 4. Create cookie
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

    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error", "Email or password incorrect.");
      return res.redirect("/login");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      req.flash("error", "Email or password incorrect.");
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
