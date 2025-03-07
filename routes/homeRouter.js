const express = require("express");
const router = express.Router();
const productModel = require("../models/product-model");

// routes/homeRouter.js
router.get("/", function (req, res) {
  res.render("home", { activePage: "home" });
});

router.get("/shop", async function (req, res) {
  let products = await productModel.find();
  res.render("shop", { products, activePage: "shop" });
});





module.exports = router;
