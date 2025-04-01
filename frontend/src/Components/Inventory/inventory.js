import React from 'react';
import { Link } from 'react-router-dom'; // For navigation to Add form
import Header from "../topNav/Header";
import Footer from "../bottomNav/Footer";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function Inventory() {
  return (
    <div className="page-container">
      <Header />
      <Container className="mt-4 mb-5">
        {/* Header Section with Search Bar and Add New Button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Form inline className="d-flex" style={{ width: '50%' }}>
            <Form.Control
              type="text"
              placeholder="Search Inventory..."
              className="mr-2"
              style={{ width: '100%' }}
            />
            <Button variant="outline-primary" type="submit">
              Search
            </Button>
          </Form>
          <Button
            variant="primary"
            href="/addinven" // Adjust route as needed
          >
            Add New Inventory
          </Button>
        </div>

        {/* Table Section */}
        <Table striped bordered hover responsive>
          <thead className="thead-dark">
            <tr>
              <th>P_ID</th>
              <th>P_Name</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {/* Add rows here if you have data, e.g., via useState and API */}
            <tr>
              <td colSpan="4" className="text-center">
                No data available yet
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
      <Footer />
    </div>
  );
}

export default Inventory;