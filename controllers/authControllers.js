const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (user) {
      req.flash("error", "You already have an accounr, please login.");
      return res.redirect("/");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await userModel.create({
      email,
      password: hashedPassword,
      fullname,
    });

    let token = generateToken(user);

    res.cookie("token", token);
    res.redirect("/shop");
  } catch (err) {
    req.flash("error", "You already have an accounr, please login.");
    return res.redirect("/");
  }
};

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (!user) {
    req.flash("error", "Email or Password incorrect!");
    return res.redirect("/");
  }

  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      res.redirect("/shop");
    } else {
      req.flash("error", "Email or Password incorrect!");
      return res.redirect("/");
    }
  });
};

module.exports.logout = function (req, res)  {
    res.clearCookie("token");
    res.redirect('/')
}


// <% if(success.length>0){ %>
//   <div class="absolute top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 rounded-md bg-blue-500">
//       <span class="inline-block mt-1 mb-1 text-white">
//           <%= success %>
//       </span>
//   </div>
//   <% } %> 
