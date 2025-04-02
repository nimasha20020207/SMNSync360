import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProgressForm() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    Project_ID: "",
    Project_Name: "",
    Description: "",
    Duration: "",
    Date: "", 
    Status: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Inputs:", inputs);

    try {
      await sendRequest();
      alert('Progress record successfully added!');
      navigate('/viewprogress'); // ✅ Redirect after submission (optional)
    } catch (error) {
      console.error("Error submitting data:", error);
      alert('Failed to add progress record.');
    }
  };

  // Send data to backend
  const sendRequest = async () => {
    await axios.post("http://localhost:5000/progress", {
      Project_ID: String(inputs.Project_ID),
      Project_Name: String(inputs.Project_Name),
      Description: String(inputs.Description),
      Duration: String(inputs.Duration),
      Date: inputs.Date ? new Date(inputs.Date).toISOString() : null, // ✅ Fix date formatting
      Status: String(inputs.Status),
    });
  };

  return (
    <div className="container my-5">
      <button 
  className="btn btn-primary" 
  onClick={() => navigate('/viewprogress')} >
  View
</button>

      <div className="bg-white p-4 shadow rounded-lg border border-gray-300" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 className="text-center text-primary mb-4">Add New Progress Record</h2>

        <form onSubmit={handleSubmit}>
          {/* Project_ID */}
          <div className="mb-3">
            <label htmlFor="Project_ID" className="form-label">Project ID</label>
            <input
              type="text"
              id="Project_ID"
              name="Project_ID"
              value={inputs.Project_ID}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter project ID"
              required
            />
          </div>

          {/* Project_Name */}
          <div className="mb-3">
            <label htmlFor="Project_Name" className="form-label">Project Name</label>
            <input
              type="text"
              id="Project_Name"
              name="Project_Name"
              value={inputs.Project_Name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter project name"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="Description" className="form-label">Description</label>
            <input
              type="text"
              id="Description"
              name="Description"
              value={inputs.Description}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter description"
              required
            />
          </div>

          {/* Duration */}
          <div className="mb-3">
            <label htmlFor="Duration" className="form-label">Duration</label>
            <input
              type="text"
              id="Duration"
              name="Duration"
              value={inputs.Duration}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter duration"
              required
            />
          </div>

          {/* Date */}
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date</label>
            <input
              type="date"
              id="date"
              name="Date"
              value={inputs.Date} // ✅ Ensure correct field name
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Status */}
          <div className="mb-3">
            <label htmlFor="Status" className="form-label">Status</label>
            <select
              id="Status"
              name="Status"
              value={inputs.Status}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="on progress">On Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProgressForm;