const express = require("express");
const router = express.Router();
const Product = require("../models/product-model");

// Dynamic route for product detail page
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    // Render a dedicated EJS view for the product
    res.render("productPage", { product });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
