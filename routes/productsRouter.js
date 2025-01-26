const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");

router.get("/", (req, res) => {
  res.send("hello");
});

module.exports = router;
