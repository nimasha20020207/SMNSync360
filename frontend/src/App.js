import React from 'react';
import {Routes,Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import HomeIM from './Component/IMcommon/HomeIM';
import Materials from './Component/IMMaterial/Materials';
import MaterialView from './Component/IMMaterial/MaterialView';
import Orders from './Component/IMOrders/Orders';
import OrderView from './Component/IMOrders/OrderView';
import Supplier from './Component/IMcommon/Supplier';
import Equipment from './Component/IMEquipment/Equipment';
import Item from './Component/IMcommon/Additempage';
import AllocateMaterial from './Component/IMcommon/AllocateMaterial';
import EquipmentView from './Component/IMEquipment/EquipmentView';
import Checkinventory from './Component/IMcommon/Checkinventory';
import UpdateMaterial from './Component/IMMaterial/UpdateMaterial';
import UpdateEquipment from './Component/IMEquipment/UpdateEquipment';
import UpdateOrder from './Component/IMOrders/UpdateOrder';
import SupplierViewOrder from './Component/IMOrders/SupplierViewOrder';
import Form from './Component/IMConfirmedOrders/Form';
import TableView from './Component/IMConfirmedOrders/TableView';
import UpdateStatus from './Component/IMConfirmedOrders/UpdateStatus';
import History from './Component/IMConfirmedOrders/History';
import OrderStatus from './Component/IMOrders/OrderStatus';


function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
        <Route path='/' element={<HomeIM/>}/>
        <Route path='/Materials' element={<Materials />}/>
        <Route path='/MaterialView' element={<MaterialView/>}/>
        <Route path='/Orders' element={<Orders/>}/>
        <Route path='/OrderView' element={<OrderView/>}/>
        <Route path='/Equipment' element={<Equipment/>}/>
        <Route path='/Item' element={<Item/>}/>
        <Route path='/AllocateMaterial' element={<AllocateMaterial/>}/>
        <Route path='/EquipmentView' element={<EquipmentView/>}/>
        <Route path='/Checkinventory' element={<Checkinventory/>}/>
        <Route path='/UpdateMaterial/:id' element={<UpdateMaterial/>}/>
        <Route path='/UpdateEquipment/:id' element={<UpdateEquipment/>}/>
        <Route path='/UpdateOrder/:id' element={<UpdateOrder/>}/>
        <Route path='/SupplierViewOrder' element={<SupplierViewOrder/>}/>
        <Route path='/Form' element={<Form/>}/>
        <Route path='/TableView' element={<TableView/>}/>
        <Route path='/UpdateStatus/:id' element={<UpdateStatus/>}/>
        <Route path='/History' element={<History/>}/>
        <Route path='/OrderStatus' element={<OrderStatus/>}/>

        <Route path='/Supplier' element={<Supplier/>}/>
      </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
