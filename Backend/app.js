const express = require("express");
const mongoose = require("mongoose");
const router = require("./Router/Budgetroute");
const router1 = require("./Router/Expensesroute");
const db = require("./util/db");
const app = express();
const cors = require('cors')

//middleware
app.use(express.json());
app.use(cors());
app.use("/Budgets",router);
app.use("/Expenses",router1);

//ajtdQYIXjaiZbNli
//mongoose.connect("mongodb+srv://janithsdissanayaka:ajtdQYIXjaiZbNli@cluster0.n2zxb.mongodb.net/")
//mongoose.connect("mongodb://0.0.0.0:27017/CCMS")

db
.then(() => console.log("connection succ"))
.then(() =>{
    app.listen(5000);
})
.catch((err)=> console.log(err));