// Register.js (Backend Model)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const regiSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {  // New field for user role
        type: String,
        required: true,
        enum: ["admin", "projectManager", "client", "supplier"], // Restrict to these roles
        default: "client", // Default role if none specified
    }
});

module.exports = mongoose.model("Register", regiSchema);