const express=require('express');
const router = express.Router();

router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("blog", { error });
});

module.exports = router;