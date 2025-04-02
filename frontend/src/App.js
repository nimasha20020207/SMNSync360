import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from "./Component/Home/Home";
import AddProjectDetails from "./Component/AddProjectDetails/AddProjectDetails";
import ScheduleProjectDetails from "./Component/ScheduleProjectDetails/ScheduleProjectDetails";
import UpdateScheduleProjects from "./Component/UpdateScheduleProjects/UpdateScheduleProjects";
import AssignTask from "./Component/AssignTask/AssignTask"; // Add this import
import AssignedTasks from "./Component/AssignedTasks/AssignedTasks"; // Add this import
import UpdateAssignedTask from "./Component/UpdateAssignedTask/UpdateAssignedTask"; // Add this import
import Inventory from "./Component/Inventory/inventory";
import Inventorycreate from "./Component/Inventory/createinventory";
import Inventoryupdate from "./Component/Inventory/updateinventory";

function App() {
  return (
    <div>
      <Routes>
      
        {/* Existing routes */}
        <Route path="/" element={<Home />} />
        <Route path="/mainhome" element={<Home />} />
        <Route path="/AddProjectDetails" element={<AddProjectDetails />} />
        <Route path="/ScheduleProjectDetails" element={<ScheduleProjectDetails />} />
        <Route path="/ScheduleProjectDetails/:id" element={<UpdateScheduleProjects />} />
        
        {/* New Task Management routes */}
        <Route path="/AssignTask" element={<AssignTask />} />
        <Route path="/AssignedTasks" element={<AssignedTasks />} />
        <Route path="/UpdateAssignedTask/:id" element={<UpdateAssignedTask />} />

        <Route path="/addinven" element={<Inventorycreate />} />
        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/Inventoryup/:_id" element={<Inventoryupdate />} />
        
      </Routes>
    </div>
  );
}

export default App;
