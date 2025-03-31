const mongoose = require("mongoose")

//const db = mongoose.connect("mongodb://0.0.0.0:27017/CCMS");
//const db = mongoose.connect("mongodb+srv://janithsdissanayaka:ajtdQYIXjaiZbNli@cluster0.n2zxb.mongodb.net/");
const db = mongoose.connect("mongodb+srv://ProjectManager:Vi1SbONH47P0slOG@cluster0.glzpz.mongodb.net/");
module.exports = db;

//ajtdQYIXjaiZbNli
//mongoose.connect("mongodb+srv://janithsdissanayaka:ajtdQYIXjaiZbNli@cluster0.n2zxb.mongodb.net/")
//mongoose.connect("mongodb://0.0.0.0:27017/CCMS")