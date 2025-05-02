import Header from '../topnav/IM/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from '../bottomnav/IM/Footer';
import { Card, Row, Col, Container, Button, ProgressBar, ListGroup, Carousel } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import inventoryImg from '../pictures/inventory2.jpg';
import materialImg from '../pictures/material.jpg';
import stockImg from '../pictures/stock2.jpg';


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

      {/* Full-width Carousel */}
      <div style={{ width: "100%", height: "300px", overflow: "hidden", marginBottom: "20px" }}>
        <Carousel style={{ height: "100%" }}>
          <Carousel.Item>
            <div style={{
              height: "300px",
              backgroundImage: `url(${inventoryImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <div style={{
                backgroundColor: "rgba(0,0,0,0.4)",
                padding: "10px 20px",
                borderRadius: "10px",
                color: "white",
                textAlign: "center"
              }}>
                <h5>Seamlessly track and manage materials and equipment.</h5>
                <p>Real-time visibility into stock levels ensures the right resources are always available</p>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div style={{
              height: "300px",
              backgroundImage: `url(${materialImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <div style={{
                backgroundColor: "rgba(0,0,0,0.4)",
                padding: "10px 20px",
                borderRadius: "10px",
                color: "white",
                textAlign: "center"
              }}>
                <h5>Assign the right materials and equipment to the right projects – effortlessly.</h5>
                <p>Strategic allocation ensures smooth project execution and resource optimization.</p>
              </div>
            </div>
          </Carousel.Item>

          <Carousel.Item>
            <div style={{
              height: "300px",
              backgroundImage: `url(${stockImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <div style={{
                backgroundColor: "rgba(0,0,0,0.4)",
                padding: "10px 20px",
                borderRadius: "10px",
                color: "white",
                textAlign: "center"
              }}>
                <h5>Automated order placement when materials run low – never pause a project again</h5>
                <p>Proactive inventory intelligence helps keep every site running efficiently</p>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Content Section */}
      <Container>
        {/* Side-by-side Pending Projects and Announcements */}
        <Row className="mt-3">
          <Col md={6}>
            <h5>Pending Projects</h5>
            <ListGroup>
              {pendingProjects.map((project) => (
                <ListGroup.Item key={project.id} className="d-flex justify-content-between align-items-center">
                  <span><strong>Project ID:</strong> {project.id} - {project.name}</span>
                  <Button variant="outline-primary" onClick={() => navigate('/IMcommon/AllocateMaterial')} size="sm">
                    Assign Materials & Equipments
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          <Col md={6}>
            <Card>
              <Card.Header as="h5">📢 Announcements</Card.Header>
              <Card.Body>
                <Card.Text><strong>03/25/2025:</strong> Budget review meeting scheduled for next week.</Card.Text>
                <Card.Text><strong>03/20/2025:</strong> Project A deadline extended to April 10th.</Card.Text>
                <Card.Text><strong>03/20/2025:</strong> Project B deadline extended to May 10th.</Card.Text>
                <Card.Text><strong>03/20/2025:</strong> Order 005 has been delivered successfully.</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          

        </Row>

        {/* Progress Bars */}
        <Row className="mt-3">
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
      </Container>

      <Footer />
    </div>
  );
}

export default App;