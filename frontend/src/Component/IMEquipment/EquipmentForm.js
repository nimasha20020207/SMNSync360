import React, { useState } from 'react';
import axios from 'axios';
//{ Ename,EType,Qty,Remarks,Date,Supplier}

function EquipmentForm() {

  const [inputs,setInputs]=useState({
    Ename:"",
    EType:"",
    Qty:"",
    Remarks:"",
    Date:"",
    Supplier:"",
  });

  const handleChange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => {
      alert('Equipment successfully added!');
    });
  };
  

  const sendRequest=async()=>{
    await axios.post("http://localhost:5000/Equipments",{
      Ename:String(inputs.Ename),
      EType:typeof inputs.EType==="string" ? inputs.EType:inputs.EType?.value||"unknown",
      Qty:String(inputs.Qty),
      Remarks:String(inputs.Remarks),
      Date: inputs.Date instanceof Date ? inputs.Date.toISOString() : new Date(inputs.Date).toISOString(),
      Supplier: typeof inputs.Supplier === "string" ? inputs.Supplier : inputs.Supplier?.value || "Unknown",

    }).then(res => res.data);
  }


  return (
    <div>
      <div className="container my-5">
      <div className="bg-white p-4 shadow rounded-lg border border-gray-300" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 className="text-center text-primary mb-4">Add New Equipment</h2>

        <form onSubmit={handleSubmit}>
          {/* Material Name */}
          <div className="mb-3">
            <label htmlFor="itemName" className="form-label">Equipment:</label>
            <input
              type="text"
              id="itemName"
              name="Ename"
              value={inputs.Ename}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter equipment name (and number for machines)"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="etype" className="form-label">Equipment type:</label>
            <select
              id="etype"
              name="EType"
              value={inputs.EType}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select equipment type</option>
              <option value="vehicle">vehicle</option>
              <option value="machine">machine</option>
              <option value="other">other</option>
            </select>
          </div>

            
            {/* Quantity */}
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">Quantity</label>
            <input
              type="text"
              id="quantity"
              name="Qty"
              value={inputs.Qty}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter quantity"
            />
          </div>

          {/* Remarks */}
          <div className="mb-3">
            <label htmlFor="remarks" className="form-label">Remarks</label>
            <textarea
              id="remarks"
              name="Remarks"
              value={inputs.Remarks}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter any remarks"
            ></textarea>
          </div>

          {/* Date */}
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date</label>
            <input
              type="date"
              id="date"
              name="Date"
              value={inputs.Date}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* Supplier */}
          <div className="mb-3">
            <label htmlFor="supplier" className="form-label">Supplier(for rented equipments)</label>
            <select
              id="supplier"
              name="Supplier"
              value={inputs.Supplier}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select Supplier</option>
              <option value="Supplier A">Supplier A</option>
              <option value="Supplier B">Supplier B</option>
              <option value="Supplier C">Supplier C</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center">
          <button
              type="submit"
              className="btn btn-primary w-100 mt-3"
            >
              Submit
            </button>

          </div>
        </form>
        </div>
      </div>
     </div> 
  );
}

export default EquipmentForm;
