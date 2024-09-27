const express = require('express')

const app = express()



app.get('/',(req,res) => {
    res.send("Server Working")
})


app.listen(5000, (err) => {
    if(err){
        console.log(err)
    }else{
        console.log("Server started on port 5000")
    }
})

//https://github.com/virajshinde