import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Route,Routes } from 'react-router-dom';
import QShome from './Component/QS/home';
import Budgetread from './Component/QS/budget';
import QsTask from './Component/QS/task'
import Newbudget from './Component/QS/createbudget'
import UpdateBudget from './Component/QS/updatebudget';
import QsCommunication from './Component/QS/communication';
import FOhome from './Component/FO/fohome';
import FoTask from './Component/FO/fotask';
import Expenses from './Component/FO/expenses';
import Newexpense from './Component/FO/createxpenses'
import UpdateExpenses from './Component/FO/updateexpense'
import Budgetstatus from './Component/FO/budgetstatus';
import Focommunicate from './Component/FO/communicationfo'


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
import Progressrea from "./Component/Progress/Users";
import ReadPro from "./Component/Progress/UserTableView";
import UPpro from "./Component/Progress/UpdateProgress"

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path='/FOhome' element={<FOhome/>}/>
          <Route path='/' element={<QShome/>}/>
          <Route path='/QShome' element={<QShome/>}/>
          <Route path='/Budget' element={<Budgetread/>}/>
          <Route path='/task' element={<QsTask/>}/>
          <Route path='/Newbudget' element={<Newbudget/>}/>
          <Route path='/Budget/:id' element={<UpdateBudget/>}/>
          <Route path='/Communication' element={<QsCommunication/>}/>
          <Route path='/taskfo' element={<FoTask/>}/>
          <Route path='/Expenses' element={<Expenses/>}/>
          <Route path='/Newexpenses' element={<Newexpense/>}/>
          <Route path='/Expenses/:id' element={<UpdateExpenses/>}/>
          <Route path='/BudgetApprove' element={<Budgetstatus/>}/>
          <Route path='/Communicationfo' element={<Focommunicate/>}/>

          
        {/* Existing routes */}
        <Route path="/" element={<Home />} />
        <Route path="/pmhome" element={<Home />} />
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

        <Route path="/Progress" element={<Progressrea />} />  
        <Route path="/viewprogress" element={<ReadPro />} /> 
        <Route path="/update/:id" element={<UPpro />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
