const mongoose = require("mongoose");
const Schema = mongoose.Schema;


var mytinerarySchema = new Schema({
  hashtags: {
    type: Array,
  },
  title: {
    type: String,
    // required: true
  },
  city: {
    type: String,
    // required: true
  },
  likes: {
    type: Number,
    // required: true
  },
  userName: {
    type: String,
    // required: true
  },
  userPhoto: {
    type: String,
    // required: true
  },
  rating: {
    type: Number,
    // required: true
  },
  hours: {
      type: Number,
      // required:true
  },
  price: {
    type: String,
    // required: true
  },
  activities: {
    type: Array
  },
  comments: {
    type: Array
  }
 
});

const Mytineraries = mongoose.model("mytineraries", mytinerarySchema, 'mytineraries');

module.exports = Mytineraries;