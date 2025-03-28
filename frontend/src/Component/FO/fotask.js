import React, { useState } from "react";
import Topnav from "../topnav/FO/fo";
import Fot from "../bottomnav/foter";
import { Container, Row, Col, Card, Dropdown, Badge, Button } from "react-bootstrap";

function FoTask() { // Renamed to PascalCase
  // Static task data (replace with backend fetch later if needed)
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

  // State to manage tasks
  const [tasks, setTasks] = useState(initialTasks);

  // Function to update task status
  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  // Status badge color mapping
  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return <Badge bg="warning" text="dark">{status}</Badge>;
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
      <Container fluid className="mt-4">
        <h1 className="text-center mb-4">Your Task</h1>
        <Row>
          {tasks.map((task) => (
            <Col md={4} key={task.id} className="mb-4">
              <Card className="shadow-sm" style={{ borderRadius: "15px", overflow: "hidden" }}>
                <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                  <span>{task.title}</span>
                  {getStatusBadge(task.status)}
                </Card.Header>
                <Card.Body>
                  <Card.Text>{task.description}</Card.Text>
                  <Card.Text>
                    <small className="text-muted">Assigned by: {task.assignedBy}</small>
                  </Card.Text>
                  <Dropdown onSelect={(eventKey) => updateTaskStatus(task.id, eventKey)}>
                    <Dropdown.Toggle variant="outline-primary" id={`dropdown-${task.id}`} size="sm">
                      Change Status
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="Pending">Pending</Dropdown.Item>
                      <Dropdown.Item eventKey="In Progress">In Progress</Dropdown.Item>
                      <Dropdown.Item eventKey="Complete">Complete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Card.Body>
                <Card.Footer className="text-end">
                  <Button variant="link" size="sm" onClick={() => updateTaskStatus(task.id, "Complete")}>
                    Mark as Complete
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Fot />
    </div>
  );
}

export default FoTask;