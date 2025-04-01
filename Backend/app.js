//app.js
const express = require("express");
const mongoose = require("mongoose");
const scheduleRouter = require("./Routes/ScheduleRoutes");
const taskRouter = require("./Routes/TaskRoutes");
const cors = require("cors");
const db = require("./util/db");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/ProjectSchedules", scheduleRouter);
app.use("/Tasks", taskRouter);

// Database connection
db
.then(() => console.log("connection succ"))
.then(() =>{
    app.listen(5000);
})
.catch((err)=> console.log(err));