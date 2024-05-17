const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
  image: String, 
  name: String,
  price: String,
  discount: {
    type: Number, 
    default: 0
  }, 
  bgcolor: String, 
  textcolor: String
});

module.exports = mongoose.model('user', productSchema); 
