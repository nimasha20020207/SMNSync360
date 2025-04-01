//import React, { useState } from 'react';
import Header from "../topNav/Header";
import Footer from "../bottomNav/Footer";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function Inventory() {
  

  return (
    <div className="page-container">
      <Header />
      <Container className="d-flex justify-content-center align-items-center flex-column mt-4 mb-5">
        <Form
          
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
              
              placeholder="Enter P_ID"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProjectName">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              name="Project_Name"
              
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
              
              placeholder="Enter Description"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCreateDate">
            <Form.Label>Create Date</Form.Label>
            <Form.Control
              type="date"
              name="Create_Date"
        
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