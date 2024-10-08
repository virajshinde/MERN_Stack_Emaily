const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')
require('./models/User')
require('./services/passport')



mongoose.connect(keys.mongoURI)
const app = express()


app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys:[keys.cookieKey]
    })
)

app.use(passport.initialize());
app.use(passport.session())

require('./routes/authRoutes')(app)

app.get('/',(req,res) => {
    res.send("Server Working")
})


const port = process.env.PORT || 5000
app.listen(port, (err) => {
    if(err){
        console.log(err)
    }else{
        console.log("Server started on port 5000")
    }
})

