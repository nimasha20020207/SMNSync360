import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../topNav/Header";
import Footer from "../bottomNav/Footer";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { FaSearch, FaPlus } from 'react-icons/fa';

const URL = "http://localhost:5000/ProjectSchedules";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function ScheduleProjectDetails() {
  const [ProjectDetails, setScheduleProjectDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const history = useNavigate();

  useEffect(() => {
    fetchHandler().then((data) => setScheduleProjectDetails(data.ProjectSchedules));
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/ProjectSchedules/${id}`)
      .then(() => {
        setScheduleProjectDetails(prevProjects => prevProjects.filter(project => project._id !== id));
      })
      .catch(err => console.error("Delete error:", err));
  };

  const filteredProjects = ProjectDetails.filter(project =>
    project.Project_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.Project_Location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.Client_Details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <Container className="mt-4">
        <h1 className="text-center mb-4">Scheduled Projects</h1>
        
        <Row className="mb-3">
  <Col md={8}>
    <InputGroup>
      <Form.Control
        placeholder="Search projects..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant="outline-secondary">
        <FaSearch />
      </Button>
    </InputGroup>
  </Col>
  <Col md={4} className="d-flex justify-content-end">
    <Button 
      variant="primary" 
      onClick={() => history('/AddProjectDetails')}
      className="px-4"
    >
      <FaPlus className="me-2" />
      Add New Project
    </Button>
  </Col>
</Row>

        <Table striped bordered hover responsive>
          <thead className="table-secondary">
            <tr>
              <th>Project Name</th>
              <th>Project Location</th>
              <th>Client Details</th>
              <th>Supervisor Details</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project, i) => (
              <tr key={i}>
                <td>{project.Project_Name}</td>
                <td>{project.Project_Location}</td>
                <td>{project.Client_Details}</td>
                <td>{project.Supervisor_Details}</td>
                <td>{new Date(project.Start_Date).toLocaleDateString()}</td>
                <td>{new Date(project.End_Date).toLocaleDateString()}</td>
                <td>
                  <Button 
                    variant="success" 
                    className="mx-1"
                    onClick={() => history(`/ScheduleProjectDetails/${project._id}`)}
                  >
                    Update
                  </Button>
                  <Button 
                    variant="danger" 
                    className="mx-1"
                    onClick={() => handleDelete(project._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Footer />
    </div>
  );
}

export default ScheduleProjectDetails;