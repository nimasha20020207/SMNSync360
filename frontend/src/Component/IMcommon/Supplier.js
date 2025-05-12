import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderSup from "../topnav/Supplier/HeaderSup";
import { ProgressBar, Carousel, Card, Row, Col, Container, Button, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from '../bottomnav/IM/Footer';
import { useNavigate } from "react-router-dom";
import orderImg from '../pictures/shoppingcart.jpg';
import cartImg from '../pictures/stock.jpg';
import warehouseImg from '../pictures/suppliers.jpg';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Supplier.css';
import SupplierMap from './SupplierMap';

function Supplier() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    

    useEffect(() => {
        axios.get("http://localhost:5000/orders")
            .then((response) => {
                if (Array.isArray(response.data.orders)) {
                    setOrders(response.data.orders);
                } else {
                    console.error("Error: Expected array but got", typeof response.data);
                    setOrders([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                setOrders([]);
            });
    }, []);

    const [statusPercentages, setStatusPercentages] = useState([]);

useEffect(() => {
  axios
    .get("http://localhost:5000/ConfirmedOrders")
    .then((res) => {
      const orders = res.data.records || [];

      const statusCount = {
        confirmed: 0,
        processing: 0,
        shipped: 0,
        delivered: 0,
      };

      orders.forEach((order) => {
        const status = order.OStatus?.toLowerCase();
        if (statusCount[status] !== undefined) {
          statusCount[status]++;
        }
      });

      const total = Object.values(statusCount).reduce((sum, val) => sum + val, 0);
      const statusPercent = Object.keys(statusCount).map((key) => ({
        label: key.charAt(0).toUpperCase() + key.slice(1),
        value: total > 0 ? Math.round((statusCount[key] / total) * 100) : 0,
        color: {
          confirmed: "#007bff", // Blue – primary
          processing: "#fd7e14", // Orange – attention/delay
          shipped: "#20c997", // Teal – in transit
          delivered: "#28a745", // Green – success
        }[key],
      }));

      setStatusPercentages(statusPercent);
    })
    .catch((err) => console.error("Error fetching order data:", err));
}, []);

    const emergencyOrders = orders.filter(order => order.Otype === "Emergency");

    return (
        <div>
            <HeaderSup />

            {/* Carousel Section */}
            <div style={{ width: "100%", height: "300px", overflow: "hidden", marginBottom: "20px" }}>
                <Carousel style={{ height: "100%" }}>
  <Carousel.Item>
    <div
      style={{
        height: "300px",
        backgroundImage: `url(${cartImg})`,
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
        <h5>Manage Orders Efficiently</h5>
        <p>As a supplier, you can confirm, reject, and update orders in real-time with full visibility.</p>
      </div>
    </div>
  </Carousel.Item>
  <Carousel.Item>
    <div
      style={{
        height: "300px",
        backgroundImage: `url(${orderImg})`,
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
        <h5>Stay Ahead with Instant Order Updates</h5>
        <p>Quickly accept or decline orders and update delivery statuses as needed.</p>
      </div>
    </div>
  </Carousel.Item>
  <Carousel.Item>
    <div
      style={{
        height: "300px",
        backgroundImage: `url(${warehouseImg})`,
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
        <h5>Keep Sites Supplied Without Delay</h5>
        <p>Monitor stock levels and fulfill urgent orders with ease to ensure continuous operations.</p>
      </div>
    </div>
  </Carousel.Item>
</Carousel>

            </div>

            {/* Page Content */}
            <Container className="mt-4">

            <Row className="mb-4">
    <Col md={3}>
        <Card className="text-center shadow card-hover" style={{ backgroundColor: "#0056b3", color: "white" }}>
            <Card.Body>
                <i className="fas fa-clipboard-list fa-2x mb-2"></i>
                <h6>Total Orders</h6>
                <h4>{orders.length}</h4>
            </Card.Body>
        </Card>
    </Col>
    <Col md={3}>
        <Card className="text-center shadow card-hover" style={{ backgroundColor: "#007bff", color: "white" }}>
            <Card.Body>
                <i className="fas fa-hourglass-half fa-2x mb-2"></i>
                <h6>Pending Orders</h6>
                <h4>{orders.filter(order => order.Status === "Pending").length}</h4>
            </Card.Body>
        </Card>
    </Col>
    <Col md={3}>
        <Card className="text-center shadow card-hover" style={{ backgroundColor: "#3399ff", color: "white" }}>
            <Card.Body>
                <i className="fas fa-exclamation-triangle fa-2x mb-2"></i>
                <h6>Emergency Orders</h6>
                <h4>{emergencyOrders.length}</h4>
            </Card.Body>
        </Card>
    </Col>
    <Col md={3}>
        <Card className="text-center shadow card-hover" style={{ backgroundColor: "#66b3ff", color: "white" }}>
            <Card.Body>
                <i className="fas fa-check-circle fa-2x mb-2"></i>
                <h6>Delivered Orders</h6>
                <h4>{orders.filter(order => order.Status === "Delivered").length}</h4>
            </Card.Body>
        </Card>
    </Col>
</Row>


                {/* Emergency Orders Table and Progress Bars */}
                <Row className="mt-4">
                    <Col md={5}>
                        <h5 className="text-danger">🚨 Emergency Orders</h5>
                        {emergencyOrders.length > 0 ? (
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Order Item</th>
                                        <th>Placed Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {emergencyOrders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order.Itemname}</td>
                                            <td>{order.Date}</td>
                                            <td>
                                                <Button variant="danger" size="sm" onClick={() => navigate('/SupplierViewOrder')}>
                                                    View Details
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <p>No emergency orders available.</p>
                        )}
                        <div className="mt-3 text-center">
                            <p>Got issues? Contact Inventory Manager</p>
                            <Button style={{ backgroundColor: "#0056b3", borderColor: "#0056b3" }}>
                                Contact Inventory Manager
                            </Button>
                        </div>
                    </Col>

                    <Col md={4}>
                          <div style={{
                            backgroundColor: "#fff",
                            padding: "20px",
                            borderRadius: "10px",
                            boxShadow: "0 0 10px rgba(0,0,0,0.05)"
                          }}>
                            <h5 className="text-center mb-3">📦 Current Order Status</h5>
                            {statusPercentages.map((status, index) => (
                              <div key={index} className="mb-3">
                                <div className="d-flex justify-content-between mb-1">
                                  <strong>{status.label}</strong>
                                  <span>{status.value}%</span>
                                </div>
                                <ProgressBar now={status.value} variant="custom" style={{ backgroundColor: "#e9ecef" }}>
                                  <ProgressBar
                                    now={status.value}
                                    style={{ backgroundColor: status.color }}
                                    animated
                                  />
                                </ProgressBar>
                              </div>
                            ))}
                          </div>
                        </Col>

<Col md={3}>
    <div style={{
        width: "100%",
        height: "100%",
        minHeight: "300px",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        <SupplierMap />
      </div>
</Col>




<Card className="mt-4">
  <Card.Header as="h5" style={{ backgroundColor: "#0056b3", color: "white" }}>
    📢 Announcements
  </Card.Header>
  <Card.Body>
    <Card.Text><strong>03/25/2025:</strong> Budget review meeting scheduled for next week.</Card.Text>
    <Card.Text><strong>03/20/2025:</strong> Project A deadline extended to April 10th.</Card.Text>
    <Card.Text><strong>03/20/2025:</strong> Project B deadline extended to May 10th.</Card.Text>
    <Card.Text><strong>03/20/2025:</strong> Order 005 has been delivered successfully.</Card.Text>
  </Card.Body>
</Card>


                </Row>
            </Container>

            <Footer />
        </div>
    );
}

export default Supplier;