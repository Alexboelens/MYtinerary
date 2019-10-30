const express = require('express')
const router = express.Router();
const User = require('../models/user')
const Mytineraries = require('../models/mytineraries')


// ADD MYTINERARY ID TO USER

router.put('/add', (req, res) => {
    Mytineraries.findOne({_id: req.body.id}, (err, result) => {
        if(result){ 
            User.findOne({_id: req.body._id}, (err, user) => {
                if(err) { return res.send(err) 
                }
                if(user){
                    User.findOne({favourites: result._id, _id: req.body._id}, (err, doc) => {
                           if(doc){
                             User.findOneAndUpdate({_id: user.id}, {$pull: {
                               favourites: result._id
                           }}, (err, removed) => {
                                if(removed){
                                    return res.status(200).send('removed')
                                }
                           })
                           } else{
                                 User.findOneAndUpdate({_id: user.id}, {$push: {
                                  favourites: result._id
                             }}, (err, add) => {
                             if(add){
                                 return res.status(200).send('added')
                             }
                        })
                        }
                    })
                      
                      
                       
                       
                       
                   
                } 
            })
        }
    })
    })
           



module.exports = router


// User.findOne({userName: req.body.userName}, (err, user) => {
//     if(user){
//         user.update({$push: {
//             favourites: result._id
//         }}, (err, doc) => {
//             res.send(doc)
//         })
//     }
// })
