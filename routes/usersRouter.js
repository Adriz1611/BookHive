const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");

/* ── POST routes ─────────────────────────── */
router.post("/register", registerUser); // ← used by the fixed signup form
router.post("/login", loginUser);

/* optional alias: keeps the old URL working too */
router.post("/signup", registerUser);

/* ── GET route ───────────────────────────── */
router.get("/logout", logoutUser);

module.exports = router;
