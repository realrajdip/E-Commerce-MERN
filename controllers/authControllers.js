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