import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from "../topNav/Header";
import Footer from "../bottomNav/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  Container, 
  Row, 
  Col, 
  Table, 
  Button, 
  InputGroup, 
  Form 
} from 'react-bootstrap';
import { FaSearch, FaPlus } from 'react-icons/fa';

function AssignedTasks() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/Tasks");
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error(error.response?.data?.message || "Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/Tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error(error.response?.data?.message || "Failed to delete task");
    }
  };

  const handleUpdate = (id) => {
    navigate(`/UpdateAssignedTask/${id}`);
  };

  const filteredTasks = tasks.filter(task => 
    Object.values(task).some(
      value => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) {
    return <div className="text-center mt-4">Loading tasks...</div>;
  }

  return (
    <div className="assigned-tasks">
      <Header />
      <Container className="mt-4 mb-5">
        <Row className="mb-4">
          <Col>
            <h1 className="text-center">Assigned Tasks</h1>
          </Col>
        </Row>

        <Row className="mb-4 align-items-center">
          <Col md={8}>
            <InputGroup>
              <Form.Control
                placeholder="Search Tasks..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline-secondary">
                <FaSearch />
              </Button>
            </InputGroup>
          </Col>
          <Col md={4} className="d-flex justify-content-end mt-2 mt-md-0">
            <Button 
              variant="primary"
              onClick={() => navigate('/AssignTask')}
            >
              <FaPlus className="me-2" />
              Assign New Task
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table striped bordered hover responsive className="mt-3">
              <thead className="table-secondary">
                <tr>
                  <th>Project ID</th>
                  <th>Task ID</th>
                  <th>PM ID</th>
                  <th>PM Name</th>
                  <th>Supervisor ID</th>
                  <th>Supervisor Name</th>
                  <th>Worker ID</th>
                  <th>Deadline</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <tr key={task._id}>
                      <td>{task.Project_ID}</td>
                      <td>{task._id}</td>
                      <td>{task.Project_Manager_ID}</td>
                      <td>{task.PM_Name}</td>
                      <td>{task.Site_Supervisor_ID}</td>
                      <td>{task.SS_Name}</td>
                      <td>{task.Worker_ID}</td>
                      <td>{new Date(task.Deadline).toLocaleDateString()}</td>
                      <td className={`priority-${task.Priority_Level}`}>
                        {task.Priority_Level}
                      </td>
                      <td className={`status-${task.Task_Status}`}>
                        {task.Task_Status}
                      </td>
                      <td>
                        <Button 
                          variant="success" 
                          size="sm"
                          className="me-2"
                          onClick={() => handleUpdate(task._id)}
                        >
                          Update
                        </Button>
                        <Button 
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(task._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="text-center">
                      No tasks found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default AssignedTasks;