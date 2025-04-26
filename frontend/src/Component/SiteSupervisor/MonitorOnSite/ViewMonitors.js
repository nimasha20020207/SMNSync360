import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Table, 
  Button, 
  Container, 
  InputGroup, 
  Form, 
  Alert, 
  Spinner,
  Row,
  Col,
  Badge,
  Pagination
} from "react-bootstrap";
import { FaSearch, FaPlus, FaCloudSun, FaCloudRain, FaSun, FaExclamationTriangle } from 'react-icons/fa';
import Navbar from "../Navbar";
import Footer from "../../bottomnav/foter";
import { toast } from "react-toastify";

function ViewMonitors() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchData = useCallback(async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("http://localhost:5000/Monitoring", { signal });
      
      // Handle both response formats
      const receivedRecords = Array.isArray(res.data) 
        ? res.data 
        : (Array.isArray(res.data?.records) ? res.data.records : []);
      
      setRecords(receivedRecords);
      setFilteredRecords(receivedRecords);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Request canceled:", err.message);
      } else {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || "Failed to fetch records. Please try again.");
        toast.error("Failed to fetch records");
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, []);

  useEffect(() => {
    fetchData();
    
    if (location.state?.success) {
      toast.success(location.state.success);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [fetchData, location, navigate]);

  useEffect(() => {
    // Filter records whenever searchTerm changes
    if (searchTerm.trim() === "") {
      setFilteredRecords(records);
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      const filtered = records.filter(record => {
        return (
          (record.Project_Name?.toLowerCase().includes(searchTermLower)) ||
          (record.Location?.toLowerCase().includes(searchTermLower)) ||
          (record.Issues_Found?.toLowerCase().includes(searchTermLower)) ||
          (record.Project_ID?.toLowerCase().includes(searchTermLower))
        );
      });
      setFilteredRecords(filtered);
    }
    setCurrentPage(1);
  }, [searchTerm, records]);
  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    
    try {
      await axios.delete(`http://localhost:5000/Monitoring/${id}`);
      toast.success("Record deleted successfully!");
      await fetchData();
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Delete failed: " + (err.response?.data?.message || err.message));
    }
  };

  const getWeatherIcon = (weather) => {
    if (!weather) return <FaCloudSun className="text-secondary" />;
    
    switch(weather.toLowerCase()) {
      case 'sunny': return <FaSun className="text-warning" />;
      case 'rainy': return <FaCloudRain className="text-primary" />;
      default: return <FaCloudSun className="text-secondary" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return "Invalid Date";
    }
  };

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <Spinner animation="border" variant="primary" />
        <span className="ms-3">Loading records...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger" className="d-flex align-items-center">
          <FaExclamationTriangle className="me-2" />
          <div>
            <h5>Error Loading Data</h5>
            <p>{error}</p>
            <Button variant="outline-danger" onClick={fetchData}>
              Retry
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <div>
      <Navbar />
      <Container className="py-4">
        <h1 className="text-center mb-4 text-primary">On-Site Monitoring</h1>
        
        <Row className="mb-4 g-3 align-items-center">
          <Col md={8} lg={9}>
            <InputGroup>
              <Form.Control
                placeholder="Search projects by name, location, issues found, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search monitoring records"
              />
              <Button variant="outline-secondary" disabled={loading}>
                <FaSearch />
              </Button>
            </InputGroup>
          </Col>
          <Col md={4} lg={3} className="d-flex justify-content-end">
            <Button 
              variant="primary" 
              onClick={() => navigate("/site-supervisor/monitor/create")}
              className="px-4"
              disabled={loading}
            >
              <FaPlus className="me-2" />
              New Record
            </Button>
          </Col>
        </Row>

        {filteredRecords.length === 0 ? (
          <Alert variant="info" className="text-center">
            {records.length === 0 
              ? "No monitoring records found. Create your first record!" 
              : "No records match your search criteria"}
          </Alert>
        ) : (
          <>
            <div className="table-responsive">
              <Table striped bordered hover className="mt-3">
                <thead className="table-secondary">
                  <tr>
                    <th>Project ID</th>
                    <th>Project Name</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Issues Found</th>
                    <th>Weather</th>
                    <th>Workers</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((record) => (
                    <tr key={record._id}>
                      <td>{record.Project_ID || "N/A"}</td>
                      <td className="fw-bold">{record.Project_Name || "N/A"}</td>
                      <td>{record.Location || "N/A"}</td>
                      <td>{formatDate(record.Monitoring_Date)}</td>
                      <td className="text-muted">
                        {record.Issues_Found || "No issues reported"}
                      </td>
                      <td>
                        <Badge bg="light" text="dark" className="d-flex align-items-center gap-2">
                          {getWeatherIcon(record.Weather_Conditions)}
                          <span className="text-capitalize">
                            {record.Weather_Conditions || "unknown"}
                          </span>
                        </Badge>
                      </td>
                      <td>
                        <Badge bg="info" className="fs-6">
                          {record.Workers_Present || 0}
                        </Badge>
                      </td>
                      <td style={{ whiteSpace: "nowrap" }}>  {/* Prevents wrapping */}
  <Button 
    variant="success" 
    size="sm"
    className="me-2 !important"  // Force the margin
    onClick={() => navigate(`/site-supervisor/monitor/update/${record._id}`)}
  >
    Update
  </Button>
  <Button 
    variant="danger" 
    size="sm"
    onClick={() => handleDelete(record._id)}
  >
    Delete
  </Button>
</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-4">
                <Pagination>
                  <Pagination.Prev 
                    onClick={() => paginate(Math.max(1, currentPage - 1))} 
                    disabled={currentPage === 1}
                  />
                  {[...Array(totalPages).keys()].map(number => (
                    <Pagination.Item
                      key={number + 1}
                      active={number + 1 === currentPage}
                      onClick={() => paginate(number + 1)}
                    >
                      {number + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next 
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))} 
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            )}
          </>
        )}
      </Container>
      <Footer />
    </div>
  );
}

export default ViewMonitors;