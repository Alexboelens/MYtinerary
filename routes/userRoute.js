
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs');


// Creates new user after checking username and email exist
router.post('/add', (req, res) => {
    User.findOne({ userName: req.body.userName }, (err, result) => {
        if (result) {
            res.send('username already exists')
        }
        if (!result) {
            User.findOne({ email: req.body.email }, (err, email) => {
                if (email) {
                    return res.send('email already exists')
                }
                if (!email) {
                    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
                    let user = new User({
                        image: req.body.image,
                        userName: req.body.userName,
                        email: req.body.email,
                        password: hashedPassword,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        country: req.body.country,
                        agreeTerms: req.body.agreeTerms
                    })

                    user.save(user, (err, user) => {
                        return res.send('user added')
                    })
                }
            })
        }
    })
})



// RETURNS ALL THE USERS IN THE DATABASE
router.get('/all', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/find/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: " + user.name + " was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/update/:id', function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});





module.exports = router
