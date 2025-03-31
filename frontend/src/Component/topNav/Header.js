import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../pictures/logo.jpg";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import "../topNav/Header.css";

function HeadNav() {
  return (
    <Navbar className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img alt="logo" src={logo} className="logo-image" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav">
            <Nav.Link as={Link} to="/" className="home">Home</Nav.Link>
            <Nav.Link as={Link} to="/ScheduleProjectDetails" className="home">Add project</Nav.Link>
            <Nav.Link as={Link} to="/AssignedTasks" className="home">Assign task</Nav.Link>
            <Nav.Link as={Link} to="/Users" className="Users">Add Progress Record</Nav.Link>
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
              <NavDropdown.Item as={Link} to="/account">My Account</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeadNav;