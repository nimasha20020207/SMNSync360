import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../pictures/logo.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import "../topnav/nav.css";

function HeadNav() {
  return (
    <Navbar className="custom-navbar">
      <Container>
        <Navbar.Brand href="/QShome">
          <img alt="logo" src={logo} className="logo-image" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav">
          <Nav.Link href="/mainhome" className="nav-link">Home</Nav.Link>
        <Nav.Link href="/ScheduleProjectDetails" className="nav-link">Scheduled Projects</Nav.Link>
        <Nav.Link href="/AssignTask" className="nav-link">Assign Task</Nav.Link>
          </Nav>
         
          <Nav className="ms-auto"> 
            <NavDropdown
              title={
                <div className="user-profile">
                  <span className="username">Username</span> 
                </div>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/account">My Account</NavDropdown.Item>
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeadNav;
