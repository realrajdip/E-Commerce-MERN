const express = require('express'); 
const router = express.Router();

if(process.env.NODE_ENV === "development") {
router.post('/create', async (req, res) => {
    res.send("ownersRouter")
})
}

router.get('/admin', (req, res) => {
    let success = req.flash("success"); 
    res.render("createProducts", {success});
})

module.exports = router; 