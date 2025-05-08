import React, { useState } from "react";
import Topnav from "../topnav/QS/qs";
import Fot from "../bottomnav/foter";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";

function Task() {
  const initialTasks = [
    {
      id: 1,
      title: "Create Budget",
      description: "Create budget from P001 project.",
      assignedBy: "PM John",
      status: "Pending",
    },
    {
      id: 2,
      title: "Create budget 2",
      description: "Recheck the budget P002",
      assignedBy: "PM Sarah",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Check Budget",
      description: "Create new budget",
      assignedBy: "PM John",
      status: "Complete",
    },
    {
      id: 4,
      title: "Check Budget",
      description: "Re check the budget",
      assignedBy: "PM John",
      status: "Complete",
    },
  ];
  const [tasks, setTasks] = useState(initialTasks);

  // Function to update task status
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  // Status badge color mapping
  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return (
          <Badge bg="warning" text="dark">
            {status}
          </Badge>
        );
      case "In Progress":
        return <Badge bg="info">{status}</Badge>;
      case "Complete":
        return <Badge bg="success">{status}</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <div>
      <Topnav />
      <div
        style={{
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          minHeight: "100vh",
          padding: "20px 0",
        }}
      >
        <Container fluid className="mt-4">
          <h1
            className="mb-5 text-center"
            style={{
              fontFamily: "'Poppins', sans-serif",
              color: "#2c3e50",
              fontWeight: "bold",
            }}
          >
            Your Tasks
          </h1>
          <Row>
            {tasks.map((task) => (
              <Col md={4} key={task.id} className="mb-4">
                <Card
                  className="shadow-lg border-0"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    transition: "transform 0.3s ease",
                    background: "rgba(255, 255, 255, 0.95)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-10px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <Card.Header
                    className="text-white d-flex justify-content-between align-items-center"
                    style={{
                      background: "linear-gradient(45deg, #3498db, #8e44ad)",
                      borderRadius: "20px 20px 0 0",
                    }}
                  >
                    <span style={{ fontWeight: "600" }}>{task.title}</span>
                    {getStatusBadge(task.status)}
                  </Card.Header>
                  <Card.Body className="p-4">
                    <Card.Text className="text-dark">
                      {task.description}
                    </Card.Text>
                    <Card.Text>
                      <small className="text-muted">
                        Assigned by: {task.assignedBy}
                      </small>
                    </Card.Text>
                    <div className="d-flex gap-2 flex-wrap">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => updateTaskStatus(task.id, "In Progress")}
                        style={{ borderRadius: "10px" }}
                      >
                        In Progress
                      </Button>
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => updateTaskStatus(task.id, "Complete")}
                        style={{ borderRadius: "10px" }}
                      >
                        Complete
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => alert(`Starting task: ${task.title}`)}
                        style={{
                          borderRadius: "10px",
                          background:
                            "linear-gradient(45deg, #ff6b6b, #ff8e53)",
                        }}
                        as={Link} to={`/Newbudget`}
                      >
                        Do Task
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        <Fot />
      </div>
    </div>
  );
}

export default Task;
