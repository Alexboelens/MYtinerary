var mongoose = require('mongoose');
const Schema = mongoose.Schema;




var UserSchema = new Schema({
  image: {
    type: String
  },
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  country: {
    type: String
  },
  agreeTerms: {
    type: Boolean
  },
  favourites: {
    type: Array
  },
  googleId: {
    type: String
  },
  token: {
    type: String
  }
});


const User = mongoose.model('user', UserSchema, 'users');


module.exports = User;