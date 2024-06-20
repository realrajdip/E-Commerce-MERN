const express = require('express'); 
const router = express.Router();

if(process.env.NODE_ENV === "development") {
router.post('/create', async (req, res) => {
    res.send("ownersRouter")
})
}

router.get('/admin', (req, res) => {
    res.render("createProducts")
})

module.exports = router; 