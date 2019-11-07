const express = require('express')
const router = express.Router();
const Mytineraries = require('../models/mytineraries')
const User = require('../models/user')
const VerifyToken = require('./verifyToken')


// post comment after finding if user is logged in mytinerary by ID
router.put('/add', (req, res) => {
    User.findOne({userName: req.body.userName}, (err, user) => {
        if(user){
              Mytineraries.findOneAndUpdate({_id:req.body.id}, 
        {$push: {comments: {
                      userName: user.userName,
                      comment: req.body.comment
            }
        }}, (err, result) => {
            if(result){
                return res.send(result)
            }
            if(err){ 
                return res.send(err) 
            }
        })
        }
    })
})





module.exports = router