import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../topnav/Header";
import Footer from "../bottomnav/foter";
import "./addproject.css"; // Import the CSS file

function AddProjectDetails() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    Project_Name: "",
    Project_Location: "",
    Client_Details: "",
    Supervisor_Details: "",
    Start_Date: "",
    End_Date: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/ProjectSchedules", {
      Project_Name: String(inputs.Project_Name),
      Project_Location: String(inputs.Project_Location),
      Client_Details: String(inputs.Client_Details),
      Supervisor_Details: String(inputs.Supervisor_Details),
      Start_Date: Date(inputs.Start_Date),
      End_Date: Date(inputs.End_Date),
    }).then(res => res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history('/ScheduleProjectDetails'));
  };

  return (
    <div className="page-container">
      <Header />
      <div className="add-project-form">
        <div className="form-container">
          <h1 className="form-title">Add New Project</h1>
          
          <form onSubmit={handleSubmit} className="project-form">
            <div className="form-row">
              <div className="form-group">
                <label>Project Name</label>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Enter Project Name"
                  name="Project_Name"
                  value={inputs.Project_Name}
                  required
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label>Project Location</label>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Enter Project Location"
                  name="Project_Location"
                  value={inputs.Project_Location}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Client Details</label>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Enter Client Details"
                  name="Client_Details"
                  value={inputs.Client_Details}
                  required
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label>Supervisor Details</label>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="Enter Supervisor Details"
                  name="Supervisor_Details"
                  value={inputs.Supervisor_Details}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  onChange={handleChange}
                  name="Start_Date"
                  value={inputs.Start_Date}
                  required
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  onChange={handleChange}
                  name="End_Date"
                  value={inputs.End_Date}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AddProjectDetails;