import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Route,Routes } from 'react-router-dom';
import QShome from './Component/QS/home';
import Budgetread from './Component/QS/budget';
import Task from './Component/QS/task'
import Newbudget from './Component/QS/createbudget'
import UpdateBudget from './Component/QS/updatebudget';
import Communication from './Component/QS/communication';


function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path='/' element={<QShome/>}/>
          <Route path='/QShome' element={<QShome/>}/>
          <Route path='/Budget' element={<Budgetread/>}/>
          <Route path='/task' element={<Task/>}/>
          <Route path='/Newbudget' element={<Newbudget/>}/>
          <Route path='/Budget/:id' element={<UpdateBudget/>}/>
          <Route path='/Communication' element={<Communication/>}/>
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
