const express = require('express')
const router = express.Router();
const Cities = require('../models/cities')

router.get('/all', (req, res) => {
  Cities.find((err, result) => {
    res.send(result)
  })
})

router.get('/:city', (req, res) => {
  let city = { city: req.params.city }
  Cities.findOne(city, (err, result) => {
      if(city) {
        return res.send(result)
      }
      if(err){
        return res.send(err)
      }
  })
})


router.post('/add', (req, res) => {
  let city = new Cities({
    country: req.body.country,
    city: req.body.city,
    image: req.body.image
  })
  city.save((err, result) => {
      if(result){
        res.send(result)
      }
  })
})
module.exports = router;