var mongoose = require('mongoose');  
const Schema = mongoose.Schema;




var UserSchema = new Schema({  
      name: {
        type: String
      },
      email: {
        type: String
      },
      password: {
        type: String
      },
});


const User = mongoose.model('user', UserSchema, 'users');


module.exports = User;