const express = require("express");
const confirmrouter = express.Router();

// Middleware for JSON parsing
confirmrouter.use(express.json());

//Import model
const ConfirmOrder=require("../Model/ConfirmOrderModel");

// Import ConfirmOrderController
const ConfirmOrderController = require("../Controllers/ConfirmOrderController");

// Create route paths
confirmrouter.get("/", ConfirmOrderController.getAllRecords);
confirmrouter.post("/", ConfirmOrderController.addNewRecord);
confirmrouter.get("/:id", ConfirmOrderController.getById);
confirmrouter.put("/:id", ConfirmOrderController.updateRecord);
confirmrouter.delete("/:id", ConfirmOrderController.deleteRecord);

// Export
module.exports = confirmrouter;
