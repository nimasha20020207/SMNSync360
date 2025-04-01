import React, { useState } from 'react';
import Header from "../topNav/Header";
import Footer from "../bottomNav/Footer";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function Inventory() {
  const [inputs, setInputs] = useState({
    P_ID: "",
    Project_Name: "",
    Description: "",
    Create_Date: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", inputs); // Placeholder for submission logic
    // Add your API call or navigation logic here, e.g.:
    // sendRequest().then(() => history('/some-route'));
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
          <h1 className="text-center mb-4 text-primary">Add Inventory Details</h1>

          <Form.Group className="mb-3" controlId="formPID">
            <Form.Label>P_ID</Form.Label>
            <Form.Control
              type="text"
              name="P_ID"
              onChange={handleChange}
              value={inputs.P_ID}
              placeholder="Enter P_ID"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProjectName">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              name="Project_Name"
              onChange={handleChange}
              value={inputs.Project_Name}
              placeholder="Enter Project Name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="Description"
              onChange={handleChange}
              value={inputs.Description}
              placeholder="Enter Description"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCreateDate">
            <Form.Label>Create Date</Form.Label>
            <Form.Control
              type="date"
              name="Create_Date"
              onChange={handleChange}
              value={inputs.Create_Date}
              required
            />
          </Form.Group>

          <div className="mt-4" style={{ width: '100%' }}>
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

export default Inventory;