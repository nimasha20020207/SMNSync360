//upade page
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from "../../topnav/supervisor/ss";
import Footer from "../../bottomnav/foter";
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';

function UpdateMonitor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    Project_ID: "",
    Project_Name: "",
    Location: "",
    Monitoring_Date: "",
    Issues_Found: "",
    Weather_Conditions: "sunny",
    Workers_Present: 0,
    Images: []
  });

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/Monitoring/${id}`);
        const data = res.data.record;
        
        const formatDate = (dateString) => {
          return dateString ? new Date(dateString).toISOString().split('T')[0] : "";
        };

        setInputs({
          ...data,
          Monitoring_Date: formatDate(data.Monitoring_Date)
        });
      } catch (err) {
        toast.error("Failed to load record");
      }
    };
    fetchRecord();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/Monitoring/${id}`, inputs);
      toast.success("Record updated!");
      navigate("/site-supervisor/monitor/view");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div>
      <Navbar />
      <Container className="py-4">
        <Card className="shadow-sm border-0">
          <Card.Body className="p-4">
            <h2 className="text-center mb-4 text-primary">Update Monitoring Record</h2>

            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Project ID</Form.Label>
                    <Form.Control 
                      name="Project_ID" 
                      value={inputs.Project_ID} 
                      onChange={handleChange}
                      readOnly
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control 
                      name="Project_Name" 
                      value={inputs.Project_Name} 
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control 
                      name="Location" 
                      value={inputs.Location} 
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Monitoring Date</Form.Label>
                    <Form.Control 
                      type="date" 
                      name="Monitoring_Date" 
                      value={inputs.Monitoring_Date}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

          
                  <Form.Group className="mb-3">
                <Form.Label>Issues Found</Form.Label>
                <Form.Control 
                  as="textarea"
                  rows={2}
                  name="Issues_Found" 
                  value={inputs.Issues_Found}
                  onChange={handleChange}
                />
              </Form.Group>


              <Form.Group className="mb-3">
                    <Form.Label>Weather Conditions</Form.Label>
                    <Form.Select 
                      name="Weather_Conditions" 
                      value={inputs.Weather_Conditions}
                      onChange={handleChange}
                    >
                      <option value="sunny">Sunny</option>
                      <option value="cloudy">Cloudy</option>
                      <option value="rainy">Rainy</option>
                    </Form.Select>
                  </Form.Group>


                  <Form.Group className="mb-3">
                    <Form.Label>Workers Present</Form.Label>
                    <Form.Control 
                      type="number" 
                      name="Workers_Present" 
                      value={inputs.Workers_Present}
                      onChange={handleChange}
                      min="0"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-grid mt-4">
                <Button variant="primary" type="submit" size="lg">
                  Update Record
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </div>
  );
}

export default UpdateMonitor;