import './HomeIM.css';
import Header from '../topnav/IM/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from '../bottomnav/IM/Footer';
import { Card, Row, Col, Container, Button, ProgressBar, ListGroup } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function App() {
  const pendingProjects = [
    { id: 1, name: "Project A" },
    { id: 2, name: "Project B" },
    { id: 3, name: "Project C" },
  ];

  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <Container className="mt-4">
        
        {/* Top Section: Pending Projects and Order Status Graph */}
        <Row>
          {/* Left Side - Pending Projects Needing Materials & Equipment */}
          <Col md={6}>
            <h5>Pending Projects</h5>
            <ListGroup style={{ backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
              {pendingProjects.map((project) => (
                <ListGroup.Item key={project.id} className="d-flex justify-content-between align-items-center" style={{ padding: '15px', marginBottom: '10px', backgroundColor: '#ffffff', borderLeft: '4px solid #0056b3' }}>
                  <span><strong>Project ID:</strong> {project.id} - {project.name}</span>
                  <Button variant="outline-primary" onClick={() => navigate('/IMcommon/AllocateMaterial')} size="sm">Assign Materials & Equipments</Button>

                </ListGroup.Item>
              ))}
            </ListGroup>

            {/* Button for Contacting Project Manager */}
            <Row className="mt-3">
              <Col>
                <p>Got issues? Contact Project Manager.</p>
                <Button variant="primary" size="sm" style={{ backgroundColor: '#0056b3', borderColor: '#0056b3' }}>Contact Project Manager</Button>
              </Col>
            </Row>
          </Col>

          {/* Right Side - Order Status Graph */}
          <Col md={6}>
            <h5>Orders</h5>
            <p><strong>Pending:</strong></p>
            <ProgressBar variant="danger" now={25} label="25%" />

            <p className="mt-2"><strong>Confirmed:</strong></p>
            <ProgressBar variant="warning" now={50} label="50%" />

            <p className="mt-2"><strong>Shipped:</strong></p>
            <ProgressBar variant="primary" now={75} label="75%" />

            <p className="mt-2"><strong>Delivered:</strong></p>
            <ProgressBar variant="success" now={100} label="100%" />
          </Col>
        </Row>

        {/* Contact Suppliers Section - Below the Graph */}
        <Row className="justify-content-end mt-3">
          <Col md={4} className="text-end">
            <p>Have issues with orders? Contact suppliers.</p>
            <Button variant="primary" onClick={() => navigate('/Supplier')} style={{ backgroundColor: '#0056b3', borderColor: '#0056b3' }}>Contact Suppliers</Button>
          </Col>
        </Row>

        {/* Announcement Section - Above Footer with wider width */}
        <Row className="mt-4">
          <Col>
            <Card>
            <Card.Header as="h5" style={{ backgroundColor: '#0056b3', color: 'white' }}>
            📢 Announcements
            </Card.Header>

              <Card.Body>
                <Card.Text>
                  <strong>03/25/2025:</strong> Budget review meeting scheduled for next week.
                </Card.Text>
                <Card.Text>
                  <strong>03/20/2025:</strong> Project A deadline extended to April 10th.
                </Card.Text>
                <Card.Text>
                  <strong>03/20/2025:</strong> Project B deadline extended to May 10th.
                </Card.Text>
                <Card.Text>
                  <strong>03/20/2025:</strong> order 005 has been delivered successfully.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
