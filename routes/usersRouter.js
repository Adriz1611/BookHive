const express = require('express');
const router=express.Router();

router.get("/",(req,res)=>{
    res.send("hello");
});


router.post("/register", (req, res) => {
  res.send("hello");
});


module.exports=router;