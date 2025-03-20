const express = require("express");
const mongoose = require("mongoose");
const app = express();

//Middleware

app.use("/",(req, res, next) => {
    res.send("It is working 2");
})

mongoose.connect("mongodb+srv://janithsdissanayaka:ajtdQYIXjaiZbNli@cluster0.n2zxb.mongodb.net/")
//mongoose.connect("mongodb://0.0.0.0:27017/CCMS")
.then(() => console.log("connection succ"))
.then(() =>{
    app.listen(5000);
})
.catch((err)=> console.log(err));




//ajtdQYIXjaiZbNli
//