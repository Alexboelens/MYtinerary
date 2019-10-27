const express = require('express')
const router = express.Router();
const VerifyToken = require('./verifyToken')


// ADD MYTINERARY TO FAVORITE
router.put('/add', (req, res) => {
    return res.send('add favorite')
})


module.exports = router
