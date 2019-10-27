var mongoose = require('mongoose');  
const Schema = mongoose.Schema;




var UserSchema = new Schema({  
      image: {
          type:String
      },
      userName: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      firstName: {
          type: String,
          required: true
      },
      lastName: {
          type: String,
          required: true
      },
      country: {
          type: String
      },
      agreeTerms: {
          type: Boolean
      }
});


const User = mongoose.model('user', UserSchema, 'users');


module.exports = User;