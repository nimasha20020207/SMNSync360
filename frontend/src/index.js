//index.js
import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import reportWebVitals from './reportWebVitals';
import Home from "./Components/Home/Home";
import AddProjectDetails from "./Components/AddProjectDetails/AddProjectDetails";
import ScheduleProjectDetails from "./Components/ScheduleProjectDetails/ScheduleProjectDetails";
import UpdateScheduleProjects from "./Components/UpdateScheduleProjects/UpdateScheduleProjects";
import AssignTask from "./Components/AssignTask/AssignTask"; 
import AssignedTasks from "./Components/AssignedTasks/AssignedTasks"; 
import UpdateAssignedTask from "./Components/UpdateAssignedTask/UpdateAssignedTask"; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render (
    <BrowserRouter>
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
      </BrowserRouter>
  );


  reportWebVitals();
