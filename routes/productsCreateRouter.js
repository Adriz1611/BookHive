const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const Product = require("../models/product-model");

// Configure multer storage to save files in /upload folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/"); // Save files to /upload folder
  },
  filename: function (req, file, cb) {
    // Create a unique file name using the current timestamp and original name
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, basename + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

// Route to create a new product with an uploaded image
router.post("/create", upload.single("image"), async (req, res) => {
  try {
    // Destructure fields from the request body
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    // Create the product using the Mongoose model.
    // Note: We're saving the file path (req.file.path) rather than the file buffer.
    let product = await Product.create({
      image: req.file.path,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });

    req.flash("success", "Product created successfully.");
    res.redirect("/owners/admin");
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong while creating the product.");
    res.redirect("back");
  }
});

module.exports = router;
