/* ───────────── controllers/authController.js ───────────── */
const bcrypt = require("bcrypt");
const User = require("../models/user-model");
const { generateToken } = require("../utils/generateToken");

/* ================  SIGN-UP  ================= */
exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    /* 1️⃣  basic validation */
    if (!fullname || !email || !password) {
      req.flash("error", "All fields are required.");
      return res.redirect("/signup");
    }
    if (password.length < 6) {
      req.flash("error", "Password must be at least 6 characters.");
      return res.redirect("/signup");
    }

    /* 2️⃣  Duplicate account? */
    if (await User.findOne({ email })) {
      req.flash("error", "Account already exists. Please log in.");
      return res.redirect("/login");
    }

    /* 3️⃣  Hash & create user */
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ fullname, email, password: hash });

    /* 4️⃣  Log the user in */
    res.cookie("token", generateToken(user), { httpOnly: true });
    res.redirect("/shop");
  } catch (err) {
    console.error(err);
    req.flash("error", "Signup failed. Please try again.");
    res.redirect("/signup");
  }
};

/* ================  LOG-IN  ================= */
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    /* 1️⃣  basic validation */
    if (!email || !password) {
      req.flash("error", "Both e-mail and password are required.");
      return res.redirect("/login");
    }

    /* 2️⃣  user exists? */
    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error", "Account not found.");
      return res.redirect("/login");
    }

    /* 3️⃣  password match? */
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      req.flash("error", "Incorrect password.");
      return res.redirect("/login");
    }

    /* 4️⃣  success */
    res.cookie("token", generateToken(user), { httpOnly: true });
    res.redirect("/shop");
  } catch (err) {
    console.error(err);
    req.flash("error", "Login failed. Please try again.");
    res.redirect("/login");
  }
};

/* ================  LOG-OUT  ================= */
exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};
