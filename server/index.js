const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
require('./models/User')
require('./services/passport')



mongoose.connect(keys.mongoURI)
const app = express()

app.use(bodyParser.json())


app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys:[keys.cookieKey]
    })
)

app.use(passport.initialize());
app.use(passport.session())

require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)

if (process.env.NODE_ENV === 'production'){
    //Express will serve up production assets
    //like our main.js file, or main.css
    app.use(express.static('client/build'))


    //Express will serve up index.html file if
    //it doesnt recognize the route


    const path = require('path');
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
// app.get('/',(req,res) => {
//     res.send("Server Working")
// })


const port = process.env.PORT || 5000
app.listen(port, (err) => {
    if(err){
        console.log(err)
    }else{
        console.log("Server started on port 5000")
    }
})

