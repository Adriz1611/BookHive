// routes/checkoutRouter.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // Fetch cart from session. If none, default to empty array.
  const cart = req.session.cart || [];

  // Render 'checkout.ejs' and pass it the cart data.
  res.render("checkout", { cart });
});

module.exports = router;
