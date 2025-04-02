import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../topNav/Header";
import Footer from "../bottomNav/Footer";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function AssignTask() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    Project_ID: "",
    Project_Manager_ID: "",
    PM_Name: "",
    Site_Supervisor_ID: "",
    SS_Name: "",
    Worker_ID: "",
    Deadline: "",
    Priority_Level: "medium",
    Task_Status: "pending",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/Tasks", inputs);
      if (response.data.success) {
        toast.success("Task assigned successfully!");
        history("/AssignedTasks");
      }
    } catch (error) {
      console.error("Error assigning task:", error);
      if (error.response) {
        if (error.response.data.missingFields) {
          toast.error(
            `Missing required fields: ${error.response.data.missingFields.join(", ")}`
          );
        } else if (error.response.data.errors) {
          toast.error(error.response.data.errors.join("\n"));
        } else {
          toast.error(error.response.data.message || "Failed to assign task");
        }
      } else {
        toast.error("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <Container className="d-flex justify-content-center align-items-center flex-column mt-4">
        <Form
          onSubmit={handleSubmit}
          style={{
            width: "70%",
            background: "#ffff",
            padding: "40px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.7)",
          }}
        >
          <h1 className="text-center mb-4 text-primary">Assign New Task</h1>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formProjectID">
                <Form.Label>Project ID</Form.Label>
                <Form.Control
                  type="text"
                  name="Project_ID"
                  onChange={handleChange}
                  value={inputs.Project_ID}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formProjectManagerID">
                <Form.Label>Project Manager ID</Form.Label>
                <Form.Control
                  type="text"
                  name="Project_Manager_ID"
                  onChange={handleChange}
                  value={inputs.Project_Manager_ID}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPMName">
                <Form.Label>PM Name</Form.Label>
                <Form.Control
                  type="text"
                  name="PM_Name"
                  onChange={handleChange}
                  value={inputs.PM_Name}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formSiteSupervisorID">
                <Form.Label>Site Supervisor ID</Form.Label>
                <Form.Control
                  type="text"
                  name="Site_Supervisor_ID"
                  onChange={handleChange}
                  value={inputs.Site_Supervisor_ID}
                  required
                />
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group className="mb-3" controlId="formSSName">
                <Form.Label>SS Name</Form.Label>
                <Form.Control
                  type="text"
                  name="SS_Name"
                  onChange={handleChange}
                  value={inputs.SS_Name}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formWorkerID">
                <Form.Label>Worker ID</Form.Label>
                <Form.Control
                  type="text"
                  name="Worker_ID"
                  onChange={handleChange}
                  value={inputs.Worker_ID}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDeadline">
                <Form.Label>Task Deadline</Form.Label>
                <Form.Control
                  type="date"
                  name="Deadline"
                  onChange={handleChange}
                  value={inputs.Deadline}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPriorityLevel">
                <Form.Label>Priority Level</Form.Label>
                <Form.Select
                  name="Priority_Level"
                  onChange={handleChange}
                  value={inputs.Priority_Level}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-4" controlId="formTaskStatus">
            <Form.Label>Task Status</Form.Label>
            <Form.Select
              name="Task_Status"
              onChange={handleChange}
              value={inputs.Task_Status}
            >
              <option value="pending">Pending</option>
              <option value="inprogress">In Progress</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            className="w-100"
            disabled={loading}
          >
            {loading ? 'Assigning...' : 'Assign Task'}
          </Button>
        </Form>
      </Container>
      <Footer />
    </div>
  );
}

export default AssignTask;