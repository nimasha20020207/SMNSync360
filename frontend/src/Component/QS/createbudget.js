import React, { useState } from "react";
import Topnav from "../topnav/QS/qs";
import Fot from "../bottomnav/foter";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Budget() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    P_ID: "",
    name: "",
    location: "",
    amount: "",
    createdDate: "",
    status: "Pending...",
    description: "No Changes yet"
  });

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log("Updated Input:", input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    
    try {
      await sendRequest();
      alert("Budget added successfully!");
      navigate("/Budget");
    } catch (error) {
      console.error("Error in submission:", error);
      if (error.response && error.response.status === 400) { // Adjust status code based on your backend
        alert("P_ID is already used. Please use a different P_ID.");
      } else {
        console.error("Error in submission:", error.response || error);
        alert("Failed to add budget. Check the console for details.");
      }
    }
  };

  const sendRequest = async () => {
    const response = await axios.post("http://localhost:5000/Budgets", {
      P_ID: String(input.P_ID),
      name: String(input.name),
      location: String(input.location),
      amount: Number(input.amount),
      createdDate: Date(input.createdDate),
      status: String(input.status),
      description: String(input.description),
    });
    return response.data;
  };

  return (
    <div>
      <Topnav />
      <Container className="d-flex justify-content-center align-items-center flex-column mt-4">
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
          <h1 className="text-center mb-4 text-primary">Add Budget Details</h1>

          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>P_ID</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              placeholder="Enter Name"
              name="P_ID"
              value={input.P_ID}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              placeholder="Enter Name"
              name="name"
              value={input.name}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              placeholder="Enter Location"
              name="location"
              value={input.location}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              onChange={handleChange}
              placeholder="Enter Amount"
              name="amount"
              value={input.amount}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupDate">
            <Form.Label>Create Date</Form.Label>
            <Form.Control
              type="date"
              onChange={handleChange}
              name="createdDate"
              value={input.createdDate}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupLocation">
            <Form.Label>Status</Form.Label>
            <Form.Select
              onChange={handleChange}
              name="status"
              value={input.status}
              required
            >
              <option value="Pending">Pending..</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              onChange={handleChange}
              name="description"
              value={input.description} 
              placeholder="Enter Description"
            />
          </Form.Group>

          <Button variant="btn btn-primary" type="submit" className="w-100">
            Submit
          </Button>
        </Form>
      </Container>
      <Fot />
    </div>
  );
}

export default Budget;
