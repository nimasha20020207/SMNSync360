import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import "./Admindashboard.css";
import { 
  FaTachometerAlt, FaUsers, FaUserCircle, FaBell, 
  FaExclamationCircle, FaHandshake, FaQuestionCircle, 
  FaSignOutAlt, FaCommentDots 
} from "react-icons/fa";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const pieData = [
  { name: 'Admins', value: 20 },
  { name: 'Managers', value: 50 },
  { name: 'Employees', value: 200 },
  { name: 'Clients', value: 100 }
];

const barData = [
  { name: 'Jan', users: 400, projects: 240 },
  { name: 'Feb', users: 300, projects: 139 },
  { name: 'Mar', users: 600, projects: 380 },
  { name: 'Apr', users: 800, projects: 430 },
  { name: 'May', users: 500, projects: 290 },
  { name: 'Jun', users: 700, projects: 400 },
];

function AdminDashboard() {
  const navigate = useNavigate();

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
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>SMN Construction</h1>
        </div>
        <div className="header-right">
          <div className="notification-badge">
            <FaBell className="icon notification-icon" />
            <span className="badge">3</span>
          </div>
          <div className="user-profile">
            <FaUserCircle className="profile-icon" />
            <span className="username">Admin</span>
            <div className="dropdown-menu">
              <Link to="/profile">My Profile</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard-container">
        <nav className="sidebar">
          <div className="sidebar-header">
            <h2>Admin Menu</h2>
          </div>
          <ul className="sidebar-menu">
            <li className="active">
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
            <li onClick={handleLogout}>
              <FaSignOutAlt className="icon" />
              <span>Logout</span>
            </li>
          </ul>
        </nav>

        <main className="main-content">
          <section className="stats-section">
            <div className="stat-card blue">
              <h3>Total Users</h3>
              <p>1,250</p>
              <FaUserCircle className="stat-icon" />
            </div>
            <div className="stat-card green">
              <h3>Active Projects</h3>
              <p>24</p>
              <FaTachometerAlt className="stat-icon" />
            </div>
            <div className="stat-card orange">
              <h3>Pending Requests</h3>
              <p>12</p>
              <FaHandshake className="stat-icon" />
            </div>
            <div className="stat-card red">
              <h3>Issues Reported</h3>
              <p>8</p>
              <FaExclamationCircle className="stat-icon" />
            </div>
          </section>

          <section className="charts-section">
            <div className="chart-container">
              <h3>User Role Distribution</h3>
              <PieChart width={300} height={300}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
            
            <div className="chart-container">
              <h3>Users vs Projects</h3>
              <BarChart
                width={500}
                height={300}
                data={barData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#8884d8" />
                <Bar dataKey="projects" fill="#82ca9d" />
              </BarChart>
            </div>
          </section>

          <section className="recent-activity">
            <h3>Recent Activities</h3>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">
                  <FaUserCircle />
                </div>
                <div className="activity-details">
                  <p>New user registered - John Doe</p>
                  <small>2 hours ago</small>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;