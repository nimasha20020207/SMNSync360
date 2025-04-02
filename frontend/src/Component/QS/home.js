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
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBudgetId, setSelectedBudgetId] = useState(null);

  // Fetch budgets from backend
  const fetchBudgets = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Budgets");
      console.log("Budgets API Response:", response.data);
      const budgetData = response.data.Budgets || response.data || [];
      const budgetArray = Array.isArray(budgetData) ? budgetData : [];
      setBudgets(budgetArray);
      if (budgetArray.length > 0) {
        setSelectedBudgetId(budgetArray[0].P_ID);
      }
    } catch (error) {
      console.error("Error fetching budgets:", error);
      setBudgets([]);
    }
  };

  // Fetch expenses from backend
  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Expenses");
      console.log("Expenses API Response:", response.data);
      const expenseData = response.data.Expenses || response.data || [];
      const expenseArray = Array.isArray(expenseData) ? expenseData : [];
      setExpenses(expenseArray);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setExpenses([]);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchBudgets(), fetchExpenses()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Handle dropdown selection
  const handleBudgetSelect = (eventKey) => {
    setSelectedBudgetId(eventKey);
  };

  // Get selected budget amount
  const getBudgetAmount = () => {
    if (loading) return "Loading...";
    if (budgets.length === 0 || !selectedBudgetId) return "Rs 0";
    const selectedBudget = budgets.find((budget) => budget.P_ID === selectedBudgetId);
    return selectedBudget ? `Rs ${Number(selectedBudget.amount).toLocaleString()}` : "Rs 0";
  };

  // Calculate spent amount for selected P_ID
  const getSpentAmount = () => {
    if (loading) return "Loading...";
    if (expenses.length === 0 || !selectedBudgetId) return "Rs 0";
    const totalSpent = expenses
      .filter((expense) => expense.P_ID === selectedBudgetId)
      .reduce((sum, expense) => sum + Number(expense.amount), 0);
    return `Rs ${totalSpent.toLocaleString()}`;
  };

  // Calculate remaining amount for selected P_ID
  const getRemainingAmount = () => {
    if (loading) return "Loading...";
    if (budgets.length === 0 || !selectedBudgetId) return "Rs 0";
    const selectedBudget = budgets.find((budget) => budget.P_ID === selectedBudgetId);
    const totalBudget = selectedBudget ? Number(selectedBudget.amount) : 0;
    const totalSpent = expenses
      .filter((expense) => expense.P_ID === selectedBudgetId)
      .reduce((sum, expense) => sum + Number(expense.amount), 0);
    const remaining = totalBudget - totalSpent;
    return `Rs ${remaining < 0 ? 0 : remaining.toLocaleString()}`;
  };

  // Calculate overdue amount for selected P_ID (excess over budget)
  const getOverdueAmount = () => {
    if (loading) return "Loading...";
    if (budgets.length === 0 || !selectedBudgetId || expenses.length === 0) return "Rs 0";
    const selectedBudget = budgets.find((budget) => budget.P_ID === selectedBudgetId);
    const totalBudget = selectedBudget ? Number(selectedBudget.amount) : 0;
    const totalSpent = expenses
      .filter((expense) => expense.P_ID === selectedBudgetId)
      .reduce((sum, expense) => sum + Number(expense.amount), 0);
    const overdue = totalSpent - totalBudget;
    return overdue > 0 ? `Rs ${overdue.toLocaleString()}` : "Rs 0";
  };

  // Dynamic chart data based on expenses for selected P_ID
  const getChartData = () => {
    if (loading || !selectedBudgetId || expenses.length === 0) {
      return {
        labels: ["No Data"],
        datasets: [
          {
            label: "Expenses",
            data: [0],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };
    }

    const filteredExpenses = expenses.filter((expenses) => expenses.P_ID === selectedBudgetId);
    const labels = filteredExpenses.map((expenses) => 
      new Date(expenses.createdDate).toLocaleDateString() // Format date as needed
    );
    const data = filteredExpenses.map((expenses) => Number(expenses.amount));

    return {
      labels: labels.length > 0 ? labels : ["No Expenses"],
      datasets: [
        {
          label: "Expenses",
          data: data.length > 0 ? data : [0],
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
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
                    <Card.Text>{getSpentAmount()}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} className="mb-3">
                <Card bg="warning" text="dark" style={{ height: "100px" }}>
                  <Card.Body>
                    <Card.Title>Remaining</Card.Title>
                    <Card.Text>{getRemainingAmount()}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} className="mb-3">
                <Card bg="danger" text="white" style={{ height: "100px" }}>
                  <Card.Body>
                    <Card.Title>Overdue</Card.Title>
                    <Card.Text>{getOverdueAmount()}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>

          {/* Right: Expenses Bar Chart */}
          <Col md={6}>
            <h3>Expenses Over Time</h3>
            <div style={{ height: "400px" }}>
              <Bar data={getChartData()} options={chartOptions} />
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