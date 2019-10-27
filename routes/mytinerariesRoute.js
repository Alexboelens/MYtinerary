const express = require('express')
const router = express.Router();
const Mytineraries = require('../models/mytineraries')

// get all mytineraries
router.get('/all', (req, res) => {
  Mytineraries.find((err, result) => {
    return res.send(result)
  })
})

// get mytineraries by city
router.get('/:city', (req, res) => {
  let city = { city: req.params.city }
  Mytineraries.find(city, (err, result) => {
    if(result){
      return res.send(result)
    }
  })
})

module.exports = router