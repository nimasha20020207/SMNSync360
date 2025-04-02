import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../pictures/logo.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import "../nav.css";

function HeadNav() {
  return (
    <Navbar className="custom-navbar">
      <Container>
        <Navbar.Brand href="/QShome">  {/* Remember this you have to change it into FO home  */}
          <img alt="logo" src={logo} className="logo-image" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav">
            <Nav.Link href="/FOhome" className="home">Home</Nav.Link>
            <Nav.Link href="/taskfo" className="task">Task</Nav.Link>
            <Nav.Link href="/BudgetApprove" className="budget">Budget</Nav.Link>
            <Nav.Link href="/Expenses" className="budget">Expenses</Nav.Link>
            <Nav.Link href="/Communicationfo" className="budget">Communication</Nav.Link>
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
