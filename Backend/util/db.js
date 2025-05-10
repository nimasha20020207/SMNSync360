const mongoose = require("mongoose")

//const db = mongoose.connect("mongodb://0.0.0.0:27017/CCMS");
const db = mongoose.connect("mongodb+srv://janithsdissanayaka:ajtdQYIXjaiZbNli@cluster0.n2zxb.mongodb.net/");


//const db=mongoose.connect("mongodb+srv://admin:2jJAe9D2xykYSgQF@cluster0.e3evh.mongodb.net/");//nimasha-db


module.exports = db;

//ajtdQYIXjaiZbNli
//mongoose.connect("mongodb+srv://janithsdissanayaka:ajtdQYIXjaiZbNli@cluster0.n2zxb.mongodb.net/")
//mongoose.connect("mongodb://0.0.0.0:27017/CCMS")
//mongodb+srv://admin12:nje2oNExl9DamvCd@cluster0.q4j6l.mongodb.net/