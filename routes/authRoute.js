const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../models/user');
const VerifyToken = require('./verifyToken')


router.post('/register', (req, res) => {
  
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
    User.create({
      name : req.body.name,
      email : req.body.email,
      password : hashedPassword
    },
     (err, user) => {
      if (err) return res.status(500).send(err)
      // create a token
      const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      })
      res.status(200).send({ auth: true, token: token });
    })
  });


  router.get('/profile', VerifyToken, (req, res) => {
    var token = req.headers['token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, (err, result) => {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      User.findById(result.id, { password: 0 }, (err, user) => {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        
        res.status(200).send(user);
      });
    });
  });



  router.post('/login', (req, res) => {

    User.findOne({ email: req.body.email }, (err, result) => {
      if (err) return res.status(500).send('Error on the server.');
      if (!result) return res.send('wrong email.');
      
      var passwordIsValid = bcrypt.compareSync(req.body.password, result.password);
      if (!passwordIsValid) return res.send('wrong password');
      
      var token = jwt.sign({ id: result._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      
      res.status(200).send({ 
        auth: true, 
        token: token,
        name: result.name
      });
    });
    
  });




  module.exports = router
