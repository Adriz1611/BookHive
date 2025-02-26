const express = require("express");
const isLoggedin = require("../middlewares/isLoggedin");
const router = express.Router();
const productModel = require("../models/product-model");

router.get("/", function (req, res) {
  res.render("home");
});

router.get("/shop",async function (req, res) {
let products= await productModel.find();
  res.render("shop",{products});
});


module.exports = router;
