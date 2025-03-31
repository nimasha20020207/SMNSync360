const express = require("express");
const mongoose = require("mongoose");
//const router = require("./Route/");
const db = require("./util/db");
const app = express();
const cors = require('cors')

//middleware
app.use(express.json());
app.use(cors());
//app.use("/",router);

//ajtdQYIXjaiZbNli
//mongoose.connect("mongodb+srv://janithsdissanayaka:ajtdQYIXjaiZbNli@cluster0.n2zxb.mongodb.net/")
//mongoose.connect("mongodb://0.0.0.0:27017/CCMS")

db
.then(() => console.log("connection succ"))
.then(() =>{
    app.listen(5000);
})
.catch((err)=> console.log(err));

// Register function
require("./Model/Register");
const User = mongoose.model("Register");

app.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body; // Add role to request body
    try {
        await User.create({
            name,
            email,
            password,
            role: role || "client", // Default to "client" if role not provided
        });
        res.send({ status: "ok" });
    } catch (err) {
        res.send({ status: "err" });
    }
});

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
                role: user.role // Return the user's role
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