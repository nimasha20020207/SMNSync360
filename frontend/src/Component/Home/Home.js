import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Header from '../topnav/Header';
import axios from 'axios';
import Footer from '../bottomnav/foter';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

// Register ChartJS components
ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

function Home() {
  const [selectedProject, setSelectedProject] = useState('project1');
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  const projectData = {
    project1: {
      progress: {
        completed: 75,
        inProgress: 20,
        notStarted: 5
      },
      budget: {
        total: 100000,
        spent: 65000,
        remaining: 35000
      }
    },
    project2: {
      progress: {
        completed: 45,
        inProgress: 35,
        notStarted: 20
      },
      budget: {
        total: 150000,
        spent: 90000,
        remaining: 60000
      }
    }
  };

  const barChartData = {
    labels: ['Completed', 'In Progress', 'Not Started'],
    datasets: [{
      label: 'Project Progress (%)',
      data: [
        projectData[selectedProject].progress.completed,
        projectData[selectedProject].progress.inProgress,
        projectData[selectedProject].progress.notStarted
      ],
      backgroundColor: ['#4CAF50', '#FF9800', '#F44336'],
      borderColor: ['#388E3C', '#F57C00', '#D32F2F'],
      borderWidth: 1
    }]
  };

  const barChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20
        }
      }
    },
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };
  // Fetch notifications from backend
  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Notification");
      console.log("Notifications API Response:", response.data);
      const notificationData = response.data.notification || response.data || [];
      const notificationArray = Array.isArray(notificationData) ? notificationData : [];
      setNotifications(notificationArray);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  };

  return (
    <div>
      <Header />

      <Container className="mt-4">
        <Row>
          {/* Left Column - Project Progress */}
          <Col md={6} lg={4}>
            <Card className="shadow-sm mb-4">
              <Card.Header as="h5" className="bg-primary text-white text-center">
                📊 Project Progress
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Select Project</Form.Label>
                  <Form.Select 
                    value={selectedProject} 
                    onChange={handleProjectChange}
                  >
                    <option value="project1">Project 1</option>
                    <option value="project2">Project 2</option>
                  </Form.Select>
                </Form.Group>
                <div style={{ position: 'relative', height: '300px' }}>
                  <Bar data={barChartData} options={barChartOptions} />
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Middle Column - Budget Details */}
          <Col md={6} lg={4}>
            <div className="d-flex flex-column gap-3 mb-4">
              <Card className="shadow" style={{ background: '#1976D2', color: 'white' }}>
                <Card.Body className="text-center">
                  <Card.Title>Total Budget</Card.Title>
                  <Card.Text style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    ${projectData[selectedProject].budget.total.toLocaleString()}
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card className="shadow" style={{ background: '#D32F2F', color: 'white' }}>
                <Card.Body className="text-center">
                  <Card.Title>Spent</Card.Title>
                  <Card.Text style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    ${projectData[selectedProject].budget.spent.toLocaleString()}
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card className="shadow" style={{ background: '#388E3C', color: 'white' }}>
                <Card.Body className="text-center">
                  <Card.Title>Remaining</Card.Title>
                  <Card.Text style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    ${projectData[selectedProject].budget.remaining.toLocaleString()}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>

          {/* Right Column - Announcements */}
          <Col md={6} lg={4}>
  <Card className="shadow-sm">
    <Card.Header as="h5" className="bg-primary text-white text-center">📢 Announcements</Card.Header>
    <Card.Body>
      {loading ? (
        <Card.Text>Loading announcements...</Card.Text>
      ) : notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <Card.Text key={index}>
            <strong>
              {notification.Date
                ? new Date(notification.Date).toLocaleDateString()
                : "No Date"}
              :
            </strong>{" "}
            {notification.message || "No message available"}
          </Card.Text>
        ))
      ) : (
        <Card.Text>No announcements available.</Card.Text>
      )}
    </Card.Body>
  </Card>
</Col>
        </Row>
      </Container>

      <div style={{
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '20px',
  paddingRight: '20px'
}}>
  <button  
    onClick={() => navigate('/Client')}  // Navigates to Client page
    style={{
      backgroundColor: '#007BFF',
      color: 'white',
      padding: '12px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: '0.3s',
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
    onMouseOut={(e) => (e.target.style.backgroundColor = '#007BFF')}
  >
    User
  </button>
</div>

      <Footer />
    </div>
  );
}

export default Home;