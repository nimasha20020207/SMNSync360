// app.js (Backend)
const express = require("express");
const mongoose = require("mongoose");
const router3 = require("./Router/UserRoute");
const app = express();
const cors = require("cors");
const User = require("./Model/UserModel");
const db = require("./util/db")
const router2 = require("./Router/MaterialRoute"); // import materials route
const orderrouter = require("./Router/OrderRoute"); // import order route
const equipmentrouter = require("./Router/EquipmentRoute"); // import Equipment route
const confirmrouter = require("./Router/ConfirmOrderRoute"); // import ConfirmOrder route
const scheduleRouter = require("./Router/ScheduleRoutes");
const taskRouter = require("./Router/TaskRoutes");
const requestinRouter = require("./Router/inventoryrequest");
const progressRouter = require("./Router/Progressroter")
const router = require("./Router/Budgetroute");
const router1 = require("./Router/Expensesroute");
const routerNotification = require("./Router/NotificationRoute");



app.use(express.json());
app.use(cors());
app.use("/users", router3);

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
app.use("/Notification", routerNotification);
//ajtdQYIXjaiZbNli
//mongoose.connect("mongodb+srv://janithsdissanayaka:ajtdQYIXjaiZbNli@cluster0.n2zxb.mongodb.net/")
//mongoose.connect("mongodb://0.0.0.0:27017/CCMS")

db
.then(() => console.log("connection succ"))
.then(() =>{
    app.listen(5000);
})
.catch((err)=> console.log(err));
// Login function
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ err: "User not found" });
        }
        if (user.password === password) {
            return res.json({ 
                status: "ok", 
                userrole: user.userrole // Return the user's role
            });
        } else {
            return res.json({ err: "incorrect password" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: "Server error" });
    }
});

// Logout route (unchanged from previous)
app.get("/logout", (req, res) => {
    res.json({ status: "ok", message: "Logged out successfully" });
});