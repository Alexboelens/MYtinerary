const express = require('express');
const router = express.Router();
const passport = require('passport')



router.get('/login', (req, res) => {
    res.send('google')
})

// google logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logout();
    res.redirect('http://localhost:3000')
})


// auth with google
router.get('/auth', passport.authenticate('google', {
    scope: ['profile']
}))

// callback route for google to redirect to
router.get('/auth/redirect', passport.authenticate('google'), (req, res) => {
    console.log(req.user)
    res.send(req.user)
})


module.exports = router