const userModel = require("../models/user-model");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const generateToken = require('../utils/generateToken')

module.exports.registerUser = async  (req, res) => {
    try {
      const { fullname, email, password } = req.body;

      let user = await userModel.findOne({email}); 

      if(user) {
        return res.status(401).send("User already have account!"); 
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
  
        user = await userModel.create({
        email,
        password: hashedPassword,
        fullname,
      });
      
      let token = generateToken(user); 
      
      res.cookie("token", token); 
      res.send("user created successfully"); 
      
    } catch (err) {
      console.log(err.message);
    }
}

module.exports.loginUser = async (req, res) => {
    let {email, password} = req.body; 

    let user = await userModel.findOne({email})
    if(!user) return res.send("Email or password incorrect!")
    
    bcrypt.compare(password, user.password, function (err, result) {
        if(true) {
            let token = generateToken(user); 
            res.cookie("token", token); 
            res.send("you can login")
        }
    })
} 