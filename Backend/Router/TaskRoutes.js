//route
const express = require("express");
const router = express.Router();
const TaskController = require("../Controllers/TaskControllers");

router.get("/", TaskController.getAllTasks);
router.post("/", TaskController.addTask);
router.get("/:id", TaskController.getTaskById);
router.put("/:id", TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);

router.get("/worker/:workerId", TaskController.getTasksByWorkerId);

module.exports = router;