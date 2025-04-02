const express = require("express");
const mongoose = require("mongoose");
const router = require("./Router/MaterialRoute"); // import materials route
const orderrouter = require("./Router/OrderRoute"); // import order route
const equipmentrouter = require("./Router/EquipmentRoute"); // import Equipment route
const confirmrouter = require("./Router/ConfirmOrderRoute"); // import ConfirmOrder route
const cors = require('cors')
const db = require("./util/db");
const app = express();
//const cors = require('cors')

//middleware
app.use(cors());
app.use(express.json());
//app.use(cors());
app.use("/Materials", router);
app.use("/Orders", orderrouter);
app.use("/Equipments", equipmentrouter);
app.use("/ConfirmedOrders", confirmrouter);
//ajtdQYIXjaiZbNli
//mongoose.connect("mongodb+srv://janithsdissanayaka:ajtdQYIXjaiZbNli@cluster0.n2zxb.mongodb.net/")
//mongoose.connect("mongodb://0.0.0.0:27017/CCMS")

db
.then(() => console.log("connection succ"))
.then(() =>{
    app.listen(5000);
})
.catch((err)=> console.log(err));