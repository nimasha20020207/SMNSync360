import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../pictures/logo.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import "./HeaderSup.css";
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
      if (typeof window.cancelRequest === 'function') {
        window.cancelRequest();
      }
      alert("Logged out successfully");
      navigate("/log", { replace: true });
    };
  return (
    <Navbar className="custom-navbar">
      <Container>
        <Navbar.Brand href="/">
          <img alt="logo" src={logo} className="logo-image" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav">
            <Nav.Link href="/Supplier" className="home">Home</Nav.Link>
            <Nav.Link href="/SupplierViewOrder" className="vieworders">New Orders</Nav.Link>
            <Nav.Link href="/TableView" className="updatestatus">Order staus</Nav.Link>
            <Nav.Link href="/History" className="orderhistory">Order History</Nav.Link>
          </Nav>
         
          <Nav className="ms-auto"> 
            <NavDropdown
              title={
                <div className="user-profile">
                  <span className="username">{userId}</span> 
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