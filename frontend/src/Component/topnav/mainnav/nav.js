import React from "react";
import Logo from "../../pictures/logo.png";
import { Link } from "react-router-dom";
import "./nav1.css";

function HeadNav() {
  return (
    <nav className="custom-navbar">
      <div className="nav-container">
        <Link to="/" className="navbar-brand">
          <img src={Logo} alt="Logo" className="logo-image" />
        </Link>

        <div className="navbar-nav">
          <Link to="/mainhome" className="nav-link">Home</Link>
          <Link to="/contact" className="nav-link">Contact Us</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/service" className="nav-link">Services</Link>
        </div>

        <div className="nav-actions ms-auto">
          <Link to="/log" className="nav-link login-btn">Log In</Link>
        </div>
      </div>
    </nav>
  );
}

export default HeadNav;