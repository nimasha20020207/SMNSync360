const mongoose = require("mongoose")

const db = mongoose.connect("mongodb://0.0.0.0:27017/CCMS");

module.exports = db;

//ajtdQYIXjaiZbNli
//mongoose.connect("mongodb+srv://janithsdissanayaka:ajtdQYIXjaiZbNli@cluster0.n2zxb.mongodb.net/")
//mongoose.connect("mongodb://0.0.0.0:27017/CCMS")