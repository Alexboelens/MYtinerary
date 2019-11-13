const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const config = require('../config');




passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    }) 
})


passport.use(
    new GoogleStrategy({
     callbackURL: 'http://localhost:3000/google/auth/redirect',
     clientID: keys.google.clientID,
     clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({googleId: profile.id}, (err, user) => {
        if(user){
            console.log('user already exists')
            done(null, user);
            // res.send(user)
        } else {
            const token = jwt.sign({ id: profile.id }, config.secret);
            new User({
                userName: profile.displayName,
                googleId: profile.id,
                image: profile._json.picture,
                token: token
            }).save().then((newUser) => {
                console.log('user created')
                done(null, newUser);
            }).catch((err) => {
                console.log(err)
            })
        }
    })
})
)