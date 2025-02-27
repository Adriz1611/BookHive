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

    // Initialize cart if not present
    if (!req.session.cart) {
      req.session.cart = [];
    }

    // Push only minimal data
    req.session.cart.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      discount: product.discount || 0,
      image: product.image ? product.image.toString("base64") : null // Convert image to base64
    });

    req.flash("success", "Book added to your cart");
    res.redirect("/cart"); // Redirect to the cart page instead of product page
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong adding to cart");
    res.redirect("back");
  }
});

// Cart Page Route
router.get("/", (req, res) => {
  res.render("cart", { cart: req.session.cart || [] });
});

module.exports = router;
