//app.js
const express = require("express");
const mongoose = require("mongoose");
const scheduleRouter = require("./Router/ScheduleRoutes");
const taskRouter = require("./Router/TaskRoutes");
const requestinRouter = require("./Router/inventoryrequest");
const cors = require("cors");
const db = require("./util/db");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/ProjectSchedules", scheduleRouter);
app.use("/Tasks", taskRouter);
app.use("/inventoryreq", requestinRouter);

// Database connection
db
.then(() => console.log("connection succ"))
.then(() =>{
    app.listen(5000);
})
.catch((err)=> console.log(err));