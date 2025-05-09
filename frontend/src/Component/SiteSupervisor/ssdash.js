// dashboard- SS
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../topnav/supervisor/ss";
import Footer from "../bottomnav/foter";
import { Container, Card, Button, Row, Col, Spinner, Carousel } from "react-bootstrap";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "react-big-calendar/lib/css/react-big-calendar.css";
import imgA from "../pictures/A.jpg";
import imgB from "../pictures/B.jpg";
import imgC from "../pictures/C.jpg";
import MonitorMap from './MonitorMap'; 

// Setup the localizer for the calendar
const locales = {
  'en-US': require('date-fns/locale/en-US')
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

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
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      title: 'Safety Inspection',
      start: new Date(2024, new Date().getMonth(), 6, 9, 0),
      end: new Date(2024, new Date().getMonth(), 6, 10, 0),
    },
    {
      title: 'Team Meeting',
      start: new Date(2024, new Date().getMonth(), 8, 14, 0),
      end: new Date(2024, new Date().getMonth(), 8, 15, 0),
    },
    {
      title: 'Report Submission',
      start: new Date(2024, new Date().getMonth(), 10, 17, 0),
      end: new Date(2024, new Date().getMonth(), 10, 17, 30),
    },
    {
      title: 'Monthly Review',
      start: new Date(2024, new Date().getMonth() + 1, 1, 10, 0),
      end: new Date(2024, new Date().getMonth() + 1, 1, 11, 30),
    }
  ]);

  const fetchCounts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/Monitoring/dashboard/counts");
      setCounts(response.data);
    } catch (err) {
      console.error("Failed to fetch counts:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  const handleNavigate = (newDate) => {
    setCurrentDate(newDate);
  };

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
      <div style={{ width: "100%", height: "250px", overflow: "hidden", marginBottom: "20px" }}>
        <Carousel style={{ height: "100%" }}>
          <Carousel.Item>
            <div
              style={{
                height: "250px",
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
                <p>Stay updated with real-time progress to ensure smooth operations.</p>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              style={{
                height: "250px",
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
                <h5>Ensure tasks are completed on time with efficient coordination.</h5>
                <p>Track worker performance to maintain workflow and accountability.</p>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              style={{
                height: "250px",
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
                <p>Proactive supervision helps maintain safety and quality.</p>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
      
      <Container className="mt-3">
        {/* Medium-sized Dashboard Cards */}
        <Row className="mb-4 g-3">
          {dashboardCards.map((card, index) => (
            <Col md={4} key={index}>
              <Card 
                className={`text-center h-100 shadow-sm ${card.bg} ${card.text} ${activeCard === card.title.toLowerCase().replace(/\s+/g, '') ? 'border border-3 border-dark' : ''}`}
                onClick={card.onClick}
                style={{ 
                  cursor: "pointer", 
                  transition: "all 0.3s",
                  minHeight: "140px",
                  borderRadius: "10px"
                }}
              >
                <Card.Body className="d-flex flex-column justify-content-center p-3">
                  <Card.Title className="fs-5 mb-2">{card.title}</Card.Title>
                  <Card.Text className="display-5 fw-bold mb-0">{card.value}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        
        <MonitorMap/>

        {/* Side by side section - Announcements and Calendar */}
        <Row className="mt-3">
          {/* Announcements - Left Side */}
          <Col md={6} className="mb-4">
            <Card className="h-100" style={{ borderRadius: "15px" }}>
              <Card.Header as="h5" className="bg-primary text-white py-3" style={{ borderRadius: "15px 15px 0 0" }}>📢 Announcements</Card.Header>
              <Card.Body className="p-4">
                <Card.Text className="mb-3">
                  <strong>05/02/2024:</strong> Weekly safety inspections every Monday at 9 AM.
                </Card.Text>
                <Card.Text className="mb-3">
                  <strong>04/28/2024:</strong> Reports due by Friday EOD.
                </Card.Text>
                <Card.Text className="mb-0">
                  <strong>05/10/2024:</strong> Equipment maintenance scheduled.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          

          {/* Calendar - Right Side */}
          <Col md={6} className="mb-1">
            <Card className="h-100" style={{ borderRadius: "15px" }}>
              <Card.Header as="h5" className="bg-primary text-white py-3" style={{ borderRadius: "15px 15px 0 0" }}>📅 Site Schedule</Card.Header>
              <Card.Body className="p-3" style={{ height: '350px' }}>
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  date={currentDate}
                  onNavigate={handleNavigate}
                  style={{ height: '100%' }}
                  defaultView="month"
                  views={['month', 'week', 'day']}
                  popup
                  toolbar
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Dashboard;