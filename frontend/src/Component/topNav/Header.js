import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../pictures/logo.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import "./Header.css";
import { useNavigate } from "react-router-dom";

function HeadNav() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("User");
  
    useEffect(() => {
      // Retrieve userId from localStorage
      const storedUserId = localStorage.getItem("username");
      setUserId(storedUserId || "User"); // Fallback to "User" if not found
    }, []);
  
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    if (typeof window.cancelRequest === "function") {
      window.cancelRequest();
    }
    alert("Logged out successfully");
    navigate("/log", { replace: true });
  };

  return (
    <Navbar className="he-custom-navbar">
      <Container>
        <Navbar.Brand href="/">
          <img alt="logo" src={logo} className="he-logo-image" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="he-navbar-nav">
            <Nav.Link href="/pmhome" className="he-home">Home</Nav.Link>
            <Nav.Link href="/ScheduleProjectDetails" className="he-home">project</Nav.Link>
            <Nav.Link href="/AssignedTasks" className="he-home">task</Nav.Link>
            <Nav.Link href="/Progress" className="he-users">Progress</Nav.Link>
            <Nav.Link href="/Users" className="he-users">Requiment</Nav.Link>
            <Nav.Link href="/Inventory" className="he-users">Inventory</Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            <NavDropdown
              title={
                <div className="he-user-profile">
                  <span className="he-username">{userId}</span>
                </div>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/account">My Account</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeadNav;