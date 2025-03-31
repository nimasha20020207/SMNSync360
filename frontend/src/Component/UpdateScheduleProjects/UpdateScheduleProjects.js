import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../topNav/Header";
import Footer from "../bottomNav/Footer";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function UpdateScheduleProjects() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      await axios.get(`http://localhost:5000/ProjectSchedules/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.ProjectSchedules));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios.put(`http://localhost:5000/ProjectSchedules/${id}`, {
      Project_Name: String(inputs.Project_Name),
      Project_Location: String(inputs.Project_Location),
      Client_Details: String(inputs.Client_Details),
      Supervisor_Details: String(inputs.Supervisor_Details),
      Start_Date: String(inputs.Start_Date),
      End_Date: String(inputs.End_Date),
    }).then((res) => res.data);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history('/ScheduleProjectDetails'));
  };

  const handleClear = () => {
    setInputs({
      Project_Name: "",
      Project_Location: "",
      Client_Details: "",
      Supervisor_Details: "",
      Start_Date: "",
      End_Date: ""
    });
  };

  return (
    <div>
      <Header />
      <Container className="d-flex justify-content-center align-items-center flex-column mt-4">
        <Form
          onSubmit={handleSubmit}
          style={{
            width: "70%",
            background: "#ffff",
            padding: "40px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.7)",
            marginBottom: "40px"
          }}
        >
          <h1 className="text-center mb-4 text-primary">Update Project Details</h1>

          <Form.Group className="mb-3" controlId="formProjectName">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              name="Project_Name"
              onChange={handleChange}
              value={inputs.Project_Name || ""}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProjectLocation">
            <Form.Label>Project Location</Form.Label>
            <Form.Control
              type="text"
              name="Project_Location"
              onChange={handleChange}
              value={inputs.Project_Location || ""}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formClientDetails">
            <Form.Label>Client Details</Form.Label>
            <Form.Control
              type="text"
              name="Client_Details"
              onChange={handleChange}
              value={inputs.Client_Details || ""}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSupervisorDetails">
            <Form.Label>Supervisor Details</Form.Label>
            <Form.Control
              type="text"
              name="Supervisor_Details"
              onChange={handleChange}
              value={inputs.Supervisor_Details || ""}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formStartDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="Start_Date"
              onChange={handleChange}
              value={inputs.Start_Date || ""}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEndDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="End_Date"
              onChange={handleChange}
              value={inputs.End_Date || ""}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit" className="w-100">
              Update
            </Button>
          </div>
        </Form>
      </Container>
      <Footer />
    </div>
  );
}

export default UpdateScheduleProjects;