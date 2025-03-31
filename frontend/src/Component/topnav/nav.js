
import React from "react";
import Logo from "../pictures/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./nav.css"; // Ensure this path is correct relative to HeadNav.jsx

function HeadNav() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("userRole");
  const username = localStorage.getItem("username") || "User";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    alert("Logged out successfully");
    navigate("/log", { replace: true });
  };

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
          
          {isLoggedIn && (
            <>
              {userRole === "admin" && (
                <Link to="/admindash" className="nav-link">Admin Dashboard</Link>
              )}
              {userRole === "projectManager" && (
                <Link to="/admindash" className="nav-link">Project Manager Dashboard</Link>
              )}
              {userRole === "client" && (
                <Link to="/admindash" className="nav-link">Client Dashboard</Link>
              )}
              {userRole === "supplier" && (
                <Link to="/admindash" className="nav-link">Supplier Dashboard</Link>
              )}
            </>
          )}
        </div>

        <div className="nav-actions">
          {isLoggedIn ? (
            <div className="user-profile">
              <span className="username">{username}</span>
              <div className="dropdown-menu">
                <Link to="/admindash" className="dropdown-item">My Account</Link>
                <button onClick={handleLogout} className="dropdown-item">Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/log" className="nav-link login-btn">Log In</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default HeadNav;