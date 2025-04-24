const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("login", { error, activePage: "login" });
});
router.post("/", function (req, res) {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    req.flash("error", "Please fill in all fields");
    return res.redirect("/login");
  }
  req.session.user = { email: email };
  res.redirect("/");
});
module.exports= router;
