// app.js (Backend)
console.log("hi");
const express = require("express");
const mongoose = require("mongoose");
const router = require("./Router/UserRoute");
const app = express();
const cors = require("cors");
const User = require("./Model/UserModel");

// Middleware
app.use(express.json());
app.use(cors());
app.use("/users", router);

mongoose.connect("mongodb+srv://admin12:nje2oNExl9DamvCd@cluster0.q4j6l.mongodb.net/")
    .then(() => console.log("Connected to MongoDB"))
    .then(() => {
        app.listen(5000);
    })
    .catch((err) => console.log(err));

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