import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import AddProjectDetails from "./Components/AddProjectDetails/AddProjectDetails";
import ScheduleProjectDetails from "./Components/ScheduleProjectDetails/ScheduleProjectDetails";
import UpdateScheduleProjects from "./Components/UpdateScheduleProjects/UpdateScheduleProjects";
import AssignTask from "./Components/AssignTask/AssignTask"; // Add this import
import AssignedTasks from "./Components/AssignedTasks/AssignedTasks"; // Add this import
import UpdateAssignedTask from "./Components/UpdateAssignedTask/UpdateAssignedTask"; // Add this import

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
        
      </Routes>
    </div>
  );
}

export default App;
