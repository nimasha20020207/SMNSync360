//app.js
const express = require("express");
const mongoose = require("mongoose");
const router2 = require("./Router/MaterialRoute"); // import materials route
const orderrouter = require("./Router/OrderRoute"); // import order route
const equipmentrouter = require("./Router/EquipmentRoute"); // import Equipment route
const confirmrouter = require("./Router/ConfirmOrderRoute"); // import ConfirmOrder route
const cors = require('cors')
const scheduleRouter = require("./Router/ScheduleRoutes");
const taskRouter = require("./Router/TaskRoutes");
const requestinRouter = require("./Router/inventoryrequest");
const progressRouter = require("./Router/Progressroter")
const cors = require("cors");
const router = require("./Router/Budgetroute");
const router1 = require("./Router/Expensesroute");
const db = require("./util/db");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/ProjectSchedules", scheduleRouter);
app.use("/Tasks", taskRouter);
app.use("/inventoryreq", requestinRouter);
app.use("/Budgets",router);
app.use("/Expenses",router1);
app.use("/progress",progressRouter);
app.use("/Materials", router2);
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