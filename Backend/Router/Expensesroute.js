const express = require("express");
const router = express.Router();
const expenses = require("../Model/Expenses");
const expensesControle = require("../Controllers/Expencesscontrol");

router.get("/",expensesControle.getAllexpenses);
router.post("/",expensesControle.addExpenses);
router.get("/:id",expensesControle.getById);
router.put("/:id",expensesControle.UpdateExpenses);
router.delete("/:id",expensesControle.DeleteExpenses);
router.get("/P_ID/:P_ID",expensesControle.findbyPID);

module.exports =router;