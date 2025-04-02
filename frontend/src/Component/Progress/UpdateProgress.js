import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../topnav/Header';
import Footer from '../bottomnav/foter';


function UpdateProgress() {
  const { id } = useParams(); // Get the ID from the route parameter
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    Project_ID: "",
    Project_Name: "",
    Description: "",
    Duration: "",
    Date: "",
    Status: "",
  });

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/progress/${id}`);
        const data = response.data.user;
        setInputs({
          Project_ID: data.Project_ID,
          Project_Name: data.Project_Name,
          Description: data.Description,
          Duration: data.Duration,
          Date: data.Date,
          Status: data.Status,
        });
      } catch (error) {
        console.error('Error fetching progress data:', error);
        alert('Failed to load progress data');
      }
    };

    fetchProgressData();
  }, [id]);

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

    try {
      await updateProgressData();
      alert('Progress record successfully updated!');
      navigate('/viewprogress'); // Redirect to the users list after update
    } catch (error) {
      console.error("Error submitting data:", error);
      alert('Failed to update progress record.');
    }
  };

  // Send updated data to backend
  const updateProgressData = async () => {
    await axios.put(`http://localhost:5000/progress/${id}`, {
      Project_ID: inputs.Project_ID,
      Project_Name: inputs.Project_Name,
      Description: inputs.Description,
      Duration: inputs.Duration,
      Date: new Date(inputs.Date).toISOString(),
      Status: inputs.Status,
    });
  };

  return (
    <div>
    <Header/>
    <div className="container my-5">
      <div className="bg-white p-4 shadow rounded-lg border border-gray-300" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 className="text-center text-primary mb-4">Update Progress Record</h2>

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
              required
            />
          </div>

          {/* Date */}
          <div className="mb-3">
            <label htmlFor="Date" className="form-label">Date</label>
            <input
              type="date"
              id="Date"
              name="Date"
              value={inputs.Date}
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default UpdateProgress;