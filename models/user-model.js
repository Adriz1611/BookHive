const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true, trim: true, minlength: 3 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    cart: { type: Array, default: [] },
    orders: { type: Array, default: [] },
    contact: Number,
    picture: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
