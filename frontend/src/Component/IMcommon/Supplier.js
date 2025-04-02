import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderSup from "../topnav/Supplier/HeaderSup";
import { ProgressBar } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from '../bottomnav/IM/Footer';
import { Card, Row, Col, Container, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Supplier() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    // Fetch orders from backend
    useEffect(() => {
        axios.get("http://localhost:5000/orders")
            .then((response) => {
                if (Array.isArray(response.data.orders)) {
                    setOrders(response.data.orders); // Use `response.data.orders` instead
                } else {
                    console.error("Error: Expected array but got", typeof response.data);
                    setOrders([]); // Fallback to empty array
                }
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                setOrders([]); // Fallback to empty array
            });
    }, []);
    
    // Filter emergency orders
    const emergencyOrders = orders.filter(order => order.Otype === "Emergency");

    return (
        <div>
            <HeaderSup />
            <Container className="mt-4">
                
                {/* Page Title */}
                <h1 style={{ textAlign: "center", color: "#0056b3", fontWeight: "bold", marginBottom: "20px" }}>
                    Welcome to Saman Constructions
                </h1>

                {/* Quick Order Summary Cards */}
                <Row className="mb-4">
                    <Col md={3}>
                        <Card className="text-center shadow" style={{ background: 'linear-gradient(to bottom right, #7da7d9, #3a5684)' }}>
                            <Card.Body>
                                <h6>Total Orders</h6>
                                <h4>{orders.length}</h4>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="text-center shadow" style={{ background: 'linear-gradient(to bottom right,rgb(235, 235, 109),rgb(232, 237, 168))' }}>
                            <Card.Body>
                                <h6>Pending Orders</h6>
                                <h4>{orders.filter(order => order.Status === "Pending").length}</h4>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="text-center shadow" style={{ background: 'linear-gradient(to bottom right, #f09d9d, #ec5252)' }}>
                            <Card.Body>
                                <h6>Emergency Orders</h6>
                                <h4>{emergencyOrders.length}</h4>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="text-center shadow" style={{ background: 'linear-gradient(to bottom right, #6dcebb, #3a8e7a)' }}>
                            <Card.Body>
                                <h6>Delivered Orders</h6>
                                <h4>{orders.filter(order => order.Status === "Delivered").length}</h4>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Emergency Orders Table */}
                <Row className="mt-4">
                    <Col md={5}>
                        <h5 className="text-danger">🚨 Emergency Orders</h5>
                        {emergencyOrders.length > 0 ? (
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Order Item</th>  {/* Updated Column Name */}
                                        <th>Placed Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {emergencyOrders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order.Itemname}</td>  {/* Displaying Order Item instead of Order ID */}
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

                        {/* Contact Inventory Manager Button */}
                        <div className="mt-3 text-center">
                            <p>Got issues? Contact Inventory Manager</p>
                            <Button style={{ backgroundColor: "#0056b3", borderColor: "#0056b3" }}>
                                Contact Inventory Manager
                            </Button>
                        </div>
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
            </Container>

            <Footer />
        </div>
    );
}

export default Supplier;
