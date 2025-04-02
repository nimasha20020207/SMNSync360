const express = require("express");
const router=express.Router();
//insert model
//insert user  controller
const userController=require("../Controllers/Progresscontrol");

router.get("/",userController.getAllProgressUsers);
router.post("/",userController.addProgressUsers);
router.get("/:id",userController.getById);
router.put("/:id",userController.updateProgressUser);
router.delete("/:id",userController.deleteProgressUser);
//export
module.exports = router;