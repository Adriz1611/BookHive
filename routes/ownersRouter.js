const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

router.get("/", (req, res) => {
    res.send("hello");
});


 router.post("/create", async(req,res)=>{
        let owners= await ownerModel.find();
        if( owners.length>0)
        {
            res.send("owner already exists");  
        }

        let {fullname,email,password}=req.body;

        let createdOwner= await ownerModel.create({
            fullname,
            email,
            password,
        });

        res.status(201).send(createdOwner);

    })
    
module.exports = router;
