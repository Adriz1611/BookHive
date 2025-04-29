
const mongoose = require("mongoose");
require("dotenv").config(); // <-- load .env

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bookhive";

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 s just like before
    });
    console.log("✅  MongoDB connected");
  } catch (err) {
    console.error("❌  MongoDB connection failed:", err.message);
    throw err; // let caller decide what to do
  }
};

module.exports = connectDB;
