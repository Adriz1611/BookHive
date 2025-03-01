const express = require("express");
const router = express.Router();
const Product = require("../models/product-model");

router.post("/add/:id", async (req, res) => {
  try {
    // Find the product by its ID
    const product = await Product.findById(req.params.id);
    if (!product) {
      req.flash("error", "Product not found");
      return res.redirect("back");
    }

    // Parse quantity from the form submission; default to 1 if invalid.
    let quantity = parseInt(req.body.quantity, 10);
    if (!quantity || quantity < 1) {
      quantity = 1;
    }

    // Initialize cart if not already present in the session
    if (!req.session.cart) {
      req.session.cart = [];
    }

    // Check if the product already exists in the cart
    const existingIndex = req.session.cart.findIndex(
      (item) => item.productId.toString() === product._id.toString()
    );

    if (existingIndex > -1) {
      // If product exists, increment its quantity
      req.session.cart[existingIndex].quantity += quantity;
    } else {
      // Otherwise, add new product with the specified quantity
      req.session.cart.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        discount: product.discount || 0,
        image: product.image ? product.image.toString("base64") : null,
        quantity: quantity,
      });
    }

    
    res.redirect("/cart");
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
