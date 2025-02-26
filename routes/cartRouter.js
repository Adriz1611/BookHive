const express = require("express");
const router = express.Router();
const Product = require("../models/product-model");

router.post("/add/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      req.flash("error", "Product not found");
      return res.redirect("back");
    }

    // Init cart if not present
    if (!req.session.cart) {
      req.session.cart = [];
    }

    // Push only minimal data
    req.session.cart.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      discount: product.discount
      
    });

    req.flash("success", "Book added to your cart");
    res.redirect(`/products/${product._id}`);
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong adding to cart");
    res.redirect("back");
  }
});

module.exports = router;
