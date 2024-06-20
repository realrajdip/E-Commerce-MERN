const express = require('express'); 
const router = express.Router();
const upload = require('../config/multer-config');
const productModel = require('../models/product-model');

router.post('/create', upload.single("image"), async (req, res) => {
    
    let {name, price, discount, bgcolor, panelcolor, textcolor} = req.body;

    let productModel = await productModel.create({
        imsge: req.file.buffer,

    })
})

module.exports = router; 