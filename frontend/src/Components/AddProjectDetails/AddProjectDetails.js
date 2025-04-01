import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../topNav/Header";
import Footer from "../bottomNav/Footer";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

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
      <Container className="d-flex justify-content-center align-items-center flex-column mt-4 mb-5">
        <Form
          onSubmit={handleSubmit}
          style={{
            width: "70%",
            background: "#ffff",
            padding: "40px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.7)",
          }}
        >
          <h1 className="text-center mb-4 text-primary">Add New Project</h1>

          <Form.Group className="mb-3" controlId="formProjectName">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              placeholder="Enter Project Name"
              name="Project_Name"
              value={inputs.Project_Name}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProjectLocation">
            <Form.Label>Project Location</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              placeholder="Enter Project Location"
              name="Project_Location"
              value={inputs.Project_Location}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formClientDetails">
            <Form.Label>Client Details</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              placeholder="Enter Client Details"
              name="Client_Details"
              value={inputs.Client_Details}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSupervisorDetails">
            <Form.Label>Supervisor Details</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              placeholder="Enter Supervisor Details"
              name="Supervisor_Details"
              value={inputs.Supervisor_Details}
              required
            />
          </Form.Group>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formStartDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  onChange={handleChange}
                  name="Start_Date"
                  value={inputs.Start_Date}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formEndDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  onChange={handleChange}
                  name="End_Date"
                  value={inputs.End_Date}
                  required
                />
              </Form.Group>
            </div>
          </div>

          <div className="mt-4" style={{ width: 'same-as-inputs' }}>
  <Button variant="primary" type="submit" className="w-100">
    Submit
  </Button>
   </div>
        </Form>
      </Container>
      <Footer />
    </div>
  );
}

export default AddProjectDetails;