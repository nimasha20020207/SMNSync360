import './App.css';
//import Nav from './Component/topnav/nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
//import Fot from './Component/bottomnav/foter';
import React from 'react';
import Home from "./Component/PM/home";
import{Route,Routes} from "react-router-dom"
import ScheduleProjectDetails from "./Component/PM/displayproject";
import AssignTask from "./Component/PM/assignettask"; // Add this import

function App() {
  return (
    <div>
        <React.Fragment>
          <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/mainhome" element={<Home />} />
        <Route path="/ScheduleProjectDetails" element={<ScheduleProjectDetails />} />
        <Route path="/AssignTask" element={<AssignTask />} />
          </Routes>
        </React.Fragment>
    </div>
  );
}

export default App;
