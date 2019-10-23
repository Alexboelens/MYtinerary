const mongoose = require("mongoose");
const Schema = mongoose.Schema;


var citiesSchema = new Schema({
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
 
});

const Cities = mongoose.model("cities", citiesSchema, 'cities');

module.exports = Cities;
