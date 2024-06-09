const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.get("/", (req, res) => {
  res.send("userrou");
});

router.post("/register", async function (req, res) {
  try {
    const { fullname, email, password } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      email,
      password: hashedPassword,
      fullname,
    });
    
    let token = jwt.sign({email, id: user._id}, "secret"); 
    
    res.cookie("token", token); 
    res.send("user created successfully"); 
    
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
