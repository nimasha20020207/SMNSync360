import './App.css';
import React from 'react';
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
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
