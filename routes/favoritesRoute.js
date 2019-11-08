const express = require('express')
const router = express.Router();
const User = require('../models/user')
const Mytineraries = require('../models/mytineraries')


// ADD MYTINERARY ID TO USER

router.put('/add', (req, res) => {
    Mytineraries.findOne({_id: req.body.mytinId}, (err, result) => {
        if(result){ 
            User.findOne({_id: req.body.userId}, (err, user) => {
                if(err) { return res.send(err) 
                }
                if(user){
                    User.findOne({favourites: result._id, _id: req.body.userId}, (err, doc) => {
                           if(doc){
                             User.findOneAndUpdate({_id: user.id}, {$pull: {
                               favourites: result._id
                           }}, (err, removed) => {
                                if(removed){
                                    return res.status(200).send('removed')
                                }
                           })
                           
                           Mytineraries.findOne({_id: req.body.mytinId}, {likes: user.userName}, (err, mytin) => {
                            if(mytin){
                                        Mytineraries.findOneAndUpdate({_id: req.body.mytinId}, {$pull: {
                                            likes: user.userName
                                        }}, (err, like) => {
                                            if(err){
                                                res.send(err)
                                            }     
                                        })
                                    
                                
                            }
                           })
                        }
                           else{
                                 User.findOneAndUpdate({_id: user.id}, {$push: {
                                  favourites: result._id
                             }}, (err, add) => {
                             if(add){
                                 return res.status(200).send('added')
                             }
                        })
                    
                       
                                        Mytineraries.findOneAndUpdate({_id: req.body.mytinId}, {$push: {
                                            likes: user.userName
                                        }}, (err, likeAdded) => {
                                            if(err){
                                                return res.send(err)
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
