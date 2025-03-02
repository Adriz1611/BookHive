const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  // Store the image path or buffer
  // (If you're actually storing the file path, use String instead of Buffer)
  image: String,

  name: String, // e.g. Book title
  about: String, // A short or general overview
  description: String, // A more in-depth description
  author: String,
  genre: String,
  rating: Number, // numeric average rating (e.g. 4.5)
  reviewsCount: Number, // total number of reviews
  pages: Number,
  language: String,
  publicationDate: String, // store as String or Date

  // If you still want to sell or track these items
  price: Number,
  discount: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("product", productSchema);
