// src/Components/Admindashboard/Admindashboard.js
import React from "react";
import { Link } from "react-router-dom";
import Nav from "../../topnav/nav";
import "./Admindashboard.css";
import { FaTachometerAlt, FaUsers, FaUserCircle, FaBell, FaExclamationCircle, FaHandshake, FaQuestionCircle, FaEnvelope, FaCommentDots } from "react-icons/fa";

function Admindashboard() {
  return (
    <div>
      <div className="admin-dashboard">
        <header className="dashboard-header">
          <h1>MSN Construction</h1>
          <div className="header-right">
            <span className="greeting">Hi, Admin</span>
            <FaEnvelope className="icon" />
            <FaBell className="icon" />
            <FaCommentDots className="icon" />
            <FaUserCircle className="icon" />
          </div>
        </header>

        <div className="dashboard-container">
          <nav className="sidebar">
            <h2>MENU</h2>
            <ul>
              <li>
                <FaTachometerAlt className="icon" />
                <span>Dashboard</span>
              </li>
              <li>
                <Link to="/userdetails">
                  <FaUsers className="icon" />
                  <span>Users</span>
                </Link>
              </li>
              <li>
                <FaUserCircle className="icon" />
                <span>Profiles</span>
              </li>
              <li>
                <FaBell className="icon" />
                <span>Notifications</span>
              </li>
              <li>
                <FaExclamationCircle className="icon" />
                <span>Issues</span>
              </li>
              <li>
                <FaHandshake className="icon" />
                <span>Request</span>
              </li>
              <li>
                <FaQuestionCircle className="icon" />
                <span>Help & Center</span>
              </li>
            </ul>
          </nav>

          <main className="main-content">
            <section className="user-statistics">
              <h3>User Statistics</h3>
              <div className="stats">
                <div className="stat-card stat-card-blue">
                  <span className="stat-value">1000</span>
                  <span className="stat-label">Total Users</span>
                </div>
                <div className="stat-card stat-card-green">
                  <span className="stat-value">800</span>
                  <span className="stat-label">Active Users</span>
                </div>
                <div className="stat-card stat-card-red">
                  <span className="stat-value">600</span>
                  <span className="stat-label">Inactive Users</span>
                </div>
                <div className="stat-card stat-card-orange">
                  <span className="stat-value">400</span>
                  <span className="stat-label">New Users</span>
                </div>
              </div>
            </section>

            <section className="subscribers">
              <h3>Subscribers</h3>
              <div className="subscriber-count">
                <div>
                  <span className="stat-value">1,294</span>
                  <span className="stat-label">This Month</span>
                </div>
                <div>
                  <span className="stat-value">1,303</span>
                  <span className="stat-label">Last Month</span>
                </div>
              </div>
            </section>

            <section className="sales">
              <h3>Projects</h3>
              <div className="sales-amount">24</div>
            </section>

            <section className="daily-sales">
              <h3>Daily Routes</h3>
              <div className="sales-period">March 25 - April 02</div>
            </section>

            <section className="export-options">
              <h3></h3>
             
            </section>

            
          </main>
        </div>
      </div>
    </div>
  );
}

export default Admindashboard;