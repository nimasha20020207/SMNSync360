import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../Navbar";
import Footer from "../../bottomNav/Footer";
import { Form, Container, Button, Row, Col, Card, Spinner } from "react-bootstrap";

function CreateMonitor() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    Project_ID: "",
    Project_Name: "",
    Location: "",
    Monitoring_Date: "",
    Issues_Found: "",
    Weather_Conditions: "sunny",
    Workers_Present: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post("http://localhost:5000/Monitoring", inputs, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 201) {
        toast.success("Record created successfully!");
        navigate("/site-supervisor/monitor/view");
      }
    } catch (error) {
      console.error("Creation error:", error);
      let errorMessage = "Failed to create record";
      
      if (error.response) {
        if (error.response.data?.errors) {
          errorMessage = error.response.data.errors.join(", ");
        } else {
          errorMessage = error.response.data?.message || errorMessage;
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <Container className="py-4">
        <Card className="shadow-sm border-0">
          <Card.Body className="p-4">
            <h2 className="text-center mb-4 text-primary">Create Monitoring Record</h2>
            
            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Project ID</Form.Label>
                    <Form.Control 
                      name="Project_ID" 
                      value={inputs.Project_ID}
                      onChange={handleChange} 
                      required 
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
                <Button 
                  variant="primary" 
                  type="submit" 
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Creating...
                    </>
                  ) : (
                    "Create Record"
                  )}
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

export default CreateMonitor;