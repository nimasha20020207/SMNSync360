//dashboard- SS
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../topnav/supervisor/ss";
import Footer from "../bottomnav/foter";
import { Container, Card, Button, Row, Col, Spinner,Carousel } from "react-bootstrap";
import imgA from "../pictures/A.jpg";
import imgB from "../pictures/B.jpg";
import imgC from "../pictures/C.jpg";




function Dashboard() {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(null);
  const [counts, setCounts] = useState({
    projects: 0,
    workers: 0,
    issues: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This is the function you asked about - it fetches the counts from the backend
  const fetchCounts = async () => {
    try {
      setLoading(true);
      // Using the dedicated endpoint we created
      const response = await axios.get("http://localhost:5000/Monitoring/dashboard/counts");
      setCounts(response.data);
    } catch (err) {
      console.error("Failed to fetch counts:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  // This useEffect hook runs when the component mounts
  useEffect(() => {
    fetchCounts();
  }, []); // Empty dependency array means it only runs once when component mounts

  // Card data with colors and click handlers
  const dashboardCards = [
    {
      title: "Active Projects",
      value: counts.projects,
      variant: "success",
      bg: "bg-success",
      text: "text-white",
      onClick: () => {
        setActiveCard("projects");
        navigate("/site-supervisor");
      }
    },
    {
      title: "Total Workers",
      value: counts.workers,
      variant: "warning",
      bg: "bg-warning",
      text: "text-dark",
      onClick: () => {
        setActiveCard("workers");
        navigate("/site-supervisor");
      }
    },
    {
      title: "Urgent Issues",
      value: counts.issues,
      variant: "danger",
      bg: "bg-danger",
      text: "text-white",
      onClick: () => {
        setActiveCard("issues");
        navigate("/site-supervisor");
      }
    }
  ];

  if (loading) {
    return (
      <div>
        <Navbar />
        <Container className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <Spinner animation="border" variant="primary" />
          <span className="ms-3">Loading dashboard data...</span>
        </Container>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <Container className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <div className="alert alert-danger">{error}</div>
          <Button variant="primary" onClick={fetchCounts} className="mt-3">
            Retry
          </Button>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      {/* Carousel Section */}
      <div style={{ width: "100%", height: "300px", overflow: "hidden", marginBottom: "20px" }}>
                <Carousel style={{ height: "100%" }}>
                    <Carousel.Item>
                        <div
                            style={{
                                height: "300px",
                                backgroundImage: `url(${imgA})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <div style={{
                                backgroundColor: "rgba(0,0,0,0.4)",
                                padding: "10px 20px",
                                borderRadius: "10px",
                                color: "white",
                                textAlign: "center"
                            }}>
                                <h5>Effectively monitor onsite work and team activities.</h5>
                           <p>Stay updated with real-time progress to ensure smooth operations on every site.</p>

                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div
                            style={{
                                height: "300px",
                                backgroundImage: `url(${imgB})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <div style={{
                                backgroundColor: "rgba(0,0,0,0.4)",
                                padding: "10px 20px",
                                borderRadius: "10px",
                                color: "white",
                                textAlign: "center"
                            }}>
                                <h5>Ensure tasks are completed on time with efficient team coordination.</h5>
                           <p>Track worker performance and site activities to maintain workflow and accountability.</p>

                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div
                            style={{
                                height: "300px",
                                backgroundImage: `url(${imgC})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <div style={{
                                backgroundColor: "rgba(0,0,0,0.4)",
                                padding: "10px 20px",
                                borderRadius: "10px",
                                color: "white",
                                textAlign: "center"
                            }}>
                                <h5>Instantly address onsite issues before they affect progress.</h5>
                       <p>Proactive supervision helps maintain safety, quality, and timely project delivery.</p>

                            </div>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>
      <Container className="mt-4">
        
        
        <Row className="mb-4 g-3">
          {dashboardCards.map((card, index) => (
            <Col md={4} key={index}>
              <Card 
                className={`text-center h-100 shadow-sm ${card.bg} ${card.text} ${activeCard === card.title.toLowerCase().replace(/\s+/g, '') ? 'border border-4 border-dark' : ''}`}
                onClick={card.onClick}
                style={{ cursor: "pointer", transition: "all 0.3s" }}
              >
                <Card.Body className="d-flex flex-column justify-content-center">
                  <Card.Title className="fs-4 mb-3">{card.title}</Card.Title>
                  <Card.Text className="display-2 fw-bold mb-0">{card.value}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Dashboard;