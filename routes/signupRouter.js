const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("signup", { error });
});

router.post("/", function (req, res) {
  let email = req.body.email;
  let password = req.body.password;
  let confirmPassword = req.body.confirmPassword;

  if (!email || !password || !confirmPassword) {
    req.flash("error", "Please fill in all fields");
    return res.redirect("/signup");
  }

  if (password !== confirmPassword) {
    req.flash("error", "Passwords do not match");
    return res.redirect("/signup");
  }

  // Simulate user registration logic here
  req.session.user = { email: email };
  res.redirect("/");
});
module.exports= router;
