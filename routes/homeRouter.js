const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.render("home");
});


router.get("/shop", function (_req, res) {
  res.render("shop");
});


module.exports = router;
