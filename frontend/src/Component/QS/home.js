import React, { useState, useEffect } from "react";
import Topnav from "../topnav/QS/qs";
import Fot from "../bottomnav/foter";
import { Container, Row, Col, Card, Form, Dropdown } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Home() {
  // State for budgets, loading, and selected budget ID
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBudgetId, setSelectedBudgetId] = useState(null); // Track selected _id

  // Fetch budgets from backend
  const fetchBudgets = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Budgets");
      console.log("API Response:", response.data); // Debug response
      const budgetData = response.data.Budgets || response.data || [];
      const budgetArray = Array.isArray(budgetData) ? budgetData : [];
      setBudgets(budgetArray);
      // Set default selection to first budget if available
      if (budgetArray.length > 0) {
        setSelectedBudgetId(budgetArray[0].P_ID);
      }
    } catch (error) {
      console.error("Error fetching budgets:", error);
      setBudgets([]);
    } finally {
      setLoading(false);
    }
  };

  // Run fetch on component mount
  useEffect(() => {
    fetchBudgets();
  }, []);

  // Handle dropdown selection
  const handleBudgetSelect = (eventKey) => {
    setSelectedBudgetId(eventKey); // eventKey is the _id from Dropdown.Item
  };

  // Function to get selected budget amount
  const getBudgetAmount = () => {
    if (loading) return "Loading...";
    if (budgets.length === 0 || !selectedBudgetId) return "Rs 0";
    const selectedBudget = budgets.find((budget) => budget.P_ID === selectedBudgetId);
    return selectedBudget ? `Rs ${Number(selectedBudget.amount).toLocaleString()}` : "Rs 0";
  };

  // Static chart data
  const chartData = {
    labels: ["2025-03-01", "2025-03-05", "2025-03-10", "2025-03-15", "2025-03-20"],
    datasets: [
      {
        label: "Expenses",
        data: [500, 1200, 800, 1500, 900],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Expenses" },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: "Expenses (Rs)" } },
      x: { title: { display: true, text: "Date" } },
    },
  };

  // Static data for other cards
  const staticBudget = { spent: 4500, remaining: 5500, overdue: 0 };

  return (
    <div>
      <Topnav />
      <Container fluid className="mt-4">
        {/* Top: Budget Dropdown */}
        <Row className="mb-4">
          <Col md={4}>
            <Form.Group>
              <Form.Label className="fw-bold">Select Budget</Form.Label>
              <Dropdown onSelect={handleBudgetSelect}>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {loading ? "Loading..." : selectedBudgetId || "Select a Budget"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {budgets.map((budget) => (
                    <Dropdown.Item key={budget.P_ID} eventKey={budget.P_ID}>
                      {budget.P_ID}
                    </Dropdown.Item>
                  ))}
                  {budgets.length === 0 && !loading && (
                    <Dropdown.Item disabled>No Budgets Available</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
          </Col>
        </Row>

        {/* Main Content: Budget Boxes (Left) and Bar Chart (Right) */}
        <Row>
          {/* Left: Budget Boxes */}
          <Col md={6}>
            <h3>Budget Overview</h3>
            <Row>
              <Col md={6} className="mb-3">
                <Card bg="primary" text="white" style={{ height: "100px" }}>
                  <Card.Body>
                    <Card.Title>Total Budget</Card.Title>
                    <Card.Text>{getBudgetAmount()}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} className="mb-3">
                <Card bg="success" text="white" style={{ height: "100px" }}>
                  <Card.Body>
                    <Card.Title>Spent</Card.Title>
                    <Card.Text>Rs {staticBudget.spent}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} className="mb-3">
                <Card bg="warning" text="dark" style={{ height: "100px" }}>
                  <Card.Body>
                    <Card.Title>Remaining</Card.Title>
                    <Card.Text>Rs {staticBudget.remaining}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} className="mb-3">
                <Card bg="danger" text="white" style={{ height: "100px" }}>
                  <Card.Body>
                    <Card.Title>Overdue</Card.Title>
                    <Card.Text>Rs {staticBudget.overdue}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>

          {/* Right: Expenses Bar Chart */}
          <Col md={6}>
            <h3>Expenses Over Time</h3>
            <div style={{ height: "400px" }}>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </Col>
        </Row>

        {/* Bottom: Announcements */}
        <Row className="mt-4">
          <Col>
            <Card>
            <Card.Header as="h5" className="bg-primary text-white">📢 Announcements</Card.Header>
              <Card.Body>
                <Card.Text>
                  <strong>03/25/2025:</strong> Budget review meeting scheduled for next week.
                </Card.Text>
                <Card.Text>
                  <strong>03/20/2025:</strong> Project A deadline extended to April 10th.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Fot />
    </div>
  );
}

export default Home;