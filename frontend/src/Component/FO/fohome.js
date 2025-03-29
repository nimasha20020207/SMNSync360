import React, { useState, useEffect } from "react";
import Topnav from "../topnav/FO/fo";
import Fot from "../bottomnav/foter";
import { Container, Row, Col, Card, Form, Dropdown, ProgressBar } from "react-bootstrap";
import { Line } from "react-chartjs-2"; // Changed from Bar to Line
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js"; // Updated imports
import axios from "axios";

// Register ChartJS components for Line chart
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function FOHome() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBudgetId, setSelectedBudgetId] = useState(null);

  // Fetch budgets from backend
  const fetchBudgets = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Budgets");
      console.log("API Response:", response.data);
      const budgetData = response.data.Budgets || response.data || [];
      const budgetArray = Array.isArray(budgetData) ? budgetData : [];
      setBudgets(budgetArray);
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

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleBudgetSelect = (eventKey) => {
    setSelectedBudgetId(eventKey);
  };

  const getBudgetAmount = () => {
    if (loading) return 0;
    if (budgets.length === 0 || !selectedBudgetId) return 0;
    const selectedBudget = budgets.find((budget) => budget.P_ID === selectedBudgetId);
    return selectedBudget ? Number(selectedBudget.amount) : 0;
  };

  // Line chart data
  const chartData = {
    labels: ["2025-03-01", "2025-03-05", "2025-03-10", "2025-03-15", "2025-03-20","2025-03-20","2025-03-20","2025-03-20","2025-03-20","2025-03-20"],
    datasets: [
      {
        label: "Expenses",
        data: [5000, 1200, 800, 1500, 9000,200,6000,8000,10000,500],
        fill: false, // No fill under the line
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Point color
        borderColor: "rgba(75, 192, 192, 1)", // Line color
        tension: 0.1, // Slight curve for the line
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Expenses Over Time" },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: "Expenses (Rs)" } },
      x: { title: { display: true, text: "Date" } },
    },
  };

  const staticBudget = { spent: 45000, remaining: 5500, overdue: 0 };
  const totalBudget = getBudgetAmount();
  const maxValue = Math.max(totalBudget, staticBudget.spent, staticBudget.remaining, staticBudget.overdue) || 10000;

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

        {/* Main Content: Budget Bars (Left) and Line Chart (Right) */}
        <Row>
          {/* Left: Budget Bars */}
          <Col md={6}>
            <h3>Budget Overview</h3>
            <div className="mb-3">
              <h5>Total Budget: Rs {totalBudget.toLocaleString()}</h5>
              <ProgressBar
                variant="primary"
                now={(totalBudget / maxValue) * 100}
                label={`Rs ${totalBudget.toLocaleString()}`}
              />
            </div>
            <div className="mb-3">
              <h5>Spent: Rs {staticBudget.spent}</h5>
              <ProgressBar
                variant="success"
                now={(staticBudget.spent / maxValue) * 100}
                label={`Rs ${staticBudget.spent}`}
              />
            </div>
            <div className="mb-3">
              <h5>Remaining: Rs {staticBudget.remaining}</h5>
              <ProgressBar
                variant="warning"
                now={(staticBudget.remaining / maxValue) * 100}
                label={`Rs ${staticBudget.remaining}`}
              />
            </div>
            <div className="mb-3">
              <h5>Overdue: Rs {staticBudget.overdue}</h5>
              <ProgressBar
                variant="danger"
                now={(staticBudget.overdue / maxValue) * 100}
                label={`Rs ${staticBudget.overdue}`}
              />
            </div>
          </Col>

          {/* Right: Expenses Line Chart */}
          <Col md={6}>
            <h3>Expenses Over Time</h3>
            <div style={{ height: "400px" }}>
              <Line data={chartData} options={chartOptions} />
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

export default FOHome;