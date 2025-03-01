const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("login", { error, activePage: "login" });
});


module.exports= router;
