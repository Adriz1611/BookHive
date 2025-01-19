const express = require('express');
const router=express.Router();

router.get("/",(req,res)=>{
    res.send("heyyo");
});


router.post("/register", (req, res) => {
  res.send("heyo bitch");
});


module.exports=router;