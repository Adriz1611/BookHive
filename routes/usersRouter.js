/* ─────────────────── routes/usersRouter.js ─────────────────── */
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/* Register  */
router.post("/register", authController.registerUser);

/* Login     */
router.post("/login", authController.loginUser);

/* Logout    ── simple GET is fine because we’re only clearing a cookie */
router.get("/logout", authController.logoutUser);

module.exports = router;
