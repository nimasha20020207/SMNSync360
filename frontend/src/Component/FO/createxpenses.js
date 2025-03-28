import React, { useState } from "react";
import Topnav from "../topnav/FO/fo";
import Fot from "../bottomnav/foter";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Expenses() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    P_ID: "",
    expencedetails:"",
    amount: "",
    createdDate: ""
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
      alert("Expense added successfully!");
      navigate("/Expenses");
    } catch (error) {
      console.error("Error in submission:", error);
    }
  };

  const sendRequest = async () => {
    const response = await axios.post("http://localhost:5000/Expenses", {
      P_ID: String(input.P_ID),
      expencedetails:String(input.expencedetails),
      amount: Number(input.amount),
      createdDate: Date(input.createdDate)
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
          <h1 className="text-center mb-4 text-primary">Add Expenses Details</h1>

          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label style={{ fontWeight: "bold" }}>P_ID</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              placeholder="Enter Name"
              name="P_ID"
              value={input.P_ID}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupDescription">
            <Form.Label style={{ fontWeight: "bold" }}>Expenses Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              onChange={handleChange}
              name="expencedetails"
              value={input.expencedetails} 
              placeholder="Enter Details"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupAmount">
            <Form.Label style={{ fontWeight: "bold" }}>Amount</Form.Label>
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
            <Form.Label style={{ fontWeight: "bold" }}>Create Date</Form.Label>
            <Form.Control
              type="date"
              onChange={handleChange}
              name="createdDate"
              value={input.createdDate}
              required
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

export default Expenses;
