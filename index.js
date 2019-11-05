require('dotenv').config();
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const cities = require('./routes/citiesRoute')
const mytineraries = require('./routes/mytinerariesRoute')
const user = require('./routes/userRoute')
const authcontroller = require('./routes/authRoute')
const comments = require('./routes/commentRoute')
const favorites = require('./routes/favoritesRoute')



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());


mongoose.connect(process.env.MONGODB_URL,
{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false } );

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {console.log('connected to MongoDB')})



app.use('/cities', cities)
app.use('/mytineraries', mytineraries)
app.use('/user', user)
app.use('/user', authcontroller)
app.use('/comment', comments)
app.use('/favorites', favorites)




app.listen(8080, () => console.log('server running on port 8080'))
