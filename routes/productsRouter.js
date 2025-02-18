const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

router.post("/create", upload.single("image"), async function (req, res) {
  try {
    // Destructure fields from req.body
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    // Create the product using your Mongoose model
    let product = await productModel.create({
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor
    });

    // Provide a success message to the user (via flash)
    req.flash("success", "Product created successfully.");

    // Redirect to the admin page
    // res.redirect("/owners/admin");
    res.send(product);
  } catch (err) {
    // Send the error message if something goes wrong
    res.send(err.message);
  }
});

module.exports = router;
