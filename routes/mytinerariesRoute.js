const express = require('express')
const router = express.Router();
const Mytineraries = require('../models/mytineraries')


router.get('/all', (req, res) => {
  Mytineraries.find((err, result) => {
    res.send(result)
  })
})

router.get('/:city', (req, res) => {
  let city = { city: req.params.city }
  Mytineraries.find(city, (err, result) => {
    if(result){
      res.send(result)
    }
  })
})





module.exports = router