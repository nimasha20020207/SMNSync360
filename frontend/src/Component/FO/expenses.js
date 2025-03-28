import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Topnav from "../topnav/FO/fo";
import Fot from "../bottomnav/foter";
import Expens from "./expensesread"
import axios from "axios";
import Table from "react-bootstrap/Table";
import { FaSearch } from "react-icons/fa";

const URL = "http://localhost:5000/Expenses";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    console.log("API Response:", response.data); // Debugging to check data
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

function Expenses() {

  const [expens, setexpens] = useState([]); // Initialize as an empty array

  useEffect(() => {
    fetchHandler().then((data) => setexpens(data || [])); // Set directly to data
  }, []);

  return (
    <div>
      <Topnav />
      <div>
        <Container className="d-flex justify-content-center align-items-center flex-column mt-4 w-100">
          <Row className="w-75 mb-3">
            <Col xs={3} className="d-flex justify-content-start">
              <Button variant="primary" className="px-5 py-2" href="/Newexpenses">
                Expenses
              </Button>
            </Col>
            <Col xs={9}>
              <InputGroup>
                <Form.Control type="text" placeholder="Search Budget..." />
                <Button variant="primary">
                  <FaSearch />
                </Button>
              </InputGroup>
            </Col>
          </Row>
          <br />
          <h1 className="mb-4">Expenses Details</h1>
          </Container>
          <Container className="mt-4">
          <Row className="w-20 mt-2">
            <Col>
              <Table className="mt-2">
                <thead className="table-secondary">
                  <tr>
                    <th style={{ width: "150px"}}>P_ID</th>
                    <th style={{ width: "300px"}}>Expenses Details</th>
                    <th style={{ width: "220px"}}>Amount</th>
                    <th style={{ width: "200px"}}>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
              </Table>
            </Col>
          </Row>

          <div>
            {expens &&
              expens.map((expenses, i) => (
                <div key={i}>
                  <Expens expenses={expenses} />
                </div>
              ))}
          </div>
        </Container>
      </div>
      <Fot />
    </div>
  );
}

export default Expenses;
