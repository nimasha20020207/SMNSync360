const express = require("express");
const router = express.Router();

// Middleware for JSON parsing
router.use(express.json());

// Insert Material model
const Material = require("../Model/MaterialModel");
// Insert Material controller
const MaterialController = require("../Controllers/MaterialController");

// Create route path
router.get("/", MaterialController.getAllMaterial);
router.post("/", MaterialController.addMaterial);
router.get("/:id", MaterialController.getById);
router.put("/:id", MaterialController.updateMaterial);
router.delete("/:id", MaterialController.deleteMaterial);
// Export
module.exports = router;
