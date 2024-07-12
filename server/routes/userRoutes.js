const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt"); // add this line
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post("/register", async (req, res) => {
    try{
        const userExists = await User.findOne({email:req.body.email})
        if(userExists){
            return res.send({
                success:false,
                message:"User already exists"
            })
        }
        const salt = await bcrypt.genSalt(10); // generate a salt
        const hashedPassword = await bcrypt.hash(req.body.password, salt); // hash the password
        req.body.password = hashedPassword;
        const user = new User(req.body);
        await user.save();
        
        return res.send({
            success:true,
            message:"User registered successfully"

        })
    }catch(error){
        return res.send({
            success:false,
            message:"Something went wrong"
        });
    }

});

router.post("/login", async (req, res) => {
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return res.send({
            success:false,
            message:"User not found"
        })
    }
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword){
        return res.send({
            success:false,
            message:"Invalid Password"
        })
    }
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
    return res.send({
        success:true,
        message:"Login Successful",
        token:token
    })

  
});
module.exports = router;