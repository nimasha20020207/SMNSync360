import React, { useState } from 'react';
//mport { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Form() {

  //const navigate = useNavigate();


  const [inputs,setInputs]=useState({
    _id: "",
    OrderID:"",
    ODetails:"",
    Date:"",
    OStatus:"",

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
      alert('Record successfully added!');
    });
  };
  

  const sendRequest=async()=>{
    await axios.post("http://localhost:5000/ConfirmedOrders",{
      OrderID:String(inputs.OrderID),
      ODetails:String(inputs.ODetails),
      Date: inputs.Date instanceof Date ? inputs.Date.toISOString() : new Date(inputs.Date).toISOString(),
      OStatus: typeof inputs.OStatus === "string" ? inputs.OStatus : inputs.OStatus?.value || "Unknown",

    }).then(res => res.data);
  }

  return (
    <div>
      <div className="container my-5">
      <div className="bg-white p-4 shadow rounded-lg border border-gray-300" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2 className="text-center mb-4" style={{ color: "#0056b3" }}>
  Add New Order Record
</h2>

        <form onSubmit={handleSubmit}>
          {/* Material Name */}
          <div className="mb-3">
            <label htmlFor="orderid" className="form-label">Order ID:</label>
            <input
              type="text"
              id="orderid"
              name="OrderID"
              value={inputs.OrderID}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter order id"
            />
          </div>


          {/* Remarks */}
          <div className="mb-3">
            <label htmlFor="des" className="form-label">Order description</label>
            <textarea
              id="des"
              name="ODetails"
              value={inputs.ODetails}
              onChange={handleChange}
              className="form-control"
              placeholder="order item ,amount ,supplier etc."
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
            <label htmlFor="status" className="form-label">Order status</label>
            <select
              id="status"
              name="OStatus"
              value={inputs.OStatus}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select status</option>
              <option value="confirmed">confirmed</option>
              <option value="processing">processing</option>
              <option value="shipped">shipped</option>
              <option value="delivered">delivered</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center">
          <button
            type="submit"
            className="btn w-100 mt-3"
            style={{ backgroundColor: "#0056b3", color: "white", border: "none" }}
            >
            Submit
            </button>

          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Form
