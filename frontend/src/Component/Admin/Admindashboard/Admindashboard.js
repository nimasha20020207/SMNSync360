import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './Admindashboard.css';
import {
  FaTachometerAlt, FaUsers, FaUserCircle, FaBell,
  FaExclamationCircle, FaHandshake, FaQuestionCircle,
  FaSignOutAlt, FaCommentDots
} from 'react-icons/fa';

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
  const loggedInUserId = localStorage.getItem('userId'); // Replace with your auth mechanism

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    if (typeof window.cancelRequest === 'function') {
      window.cancelRequest();
    }
    alert('Logged out successfully');
    navigate('/log', { replace: true });
  };

  return (
    <div className="ad-admin-dashboard">
      <header className="ad-dashboard-header">
        <div className="ad-header-left">
          <h1>SMN Construction</h1>
        </div>
        <div className="ad-header-right">
          <div className="ad-notification-badge">
          <Link to="/notificationdetails">
            <FaBell className="ad-icon ad-notification-icon" />
            </Link>
            <span className="ad-badge">3</span>
          </div>
          <div className="ad-user-profile">
            <FaUserCircle className="ad-profile-icon" />
            <span className="ad-username">Admin</span>
            <div className="ad-dropdown-menu">
            <Link to={`/profile/${loggedInUserId}`}>My Profile</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </header>

      <div className="ad-dashboard-container">
        <nav className="ad-sidebar">
          <div className="ad-sidebar-header">
            <h2>Admin Menu</h2>
          </div>
          <ul className="ad-sidebar-menu">
            <li className="ad-active">
              <FaTachometerAlt className="ad-icon" />
              <span>Dashboard</span>
            </li>
            <li>
              <Link to="/userdetails">
                <FaUsers className="ad-icon" />
                <span>Users</span>
              </Link>
            </li>
            <li>
              <Link to="/users" state={{ showGridView: true }}>
                <FaUserCircle className="ad-icon" />
                <span>Profiles</span>
              </Link>
            </li>
            <li>
              <Link to="/notificationdetails">
                <FaBell className="ad-icon" />
                <span>Notifications</span>
              </Link>
            </li>
            <li>
            <Link to="/issues">
              <FaExclamationCircle className="ad-icon" />
              <span>Issues</span>
              </Link>
            </li>
            <li>
              <Link to="/passworddetails">
                <FaHandshake className="ad-icon" />
                <span>Request</span>
              </Link>
            </li>
            <li>
              <Link to="/helpcenter">
                <FaQuestionCircle className="ad-icon" />
                <span>Help & Center</span>
              </Link>
            </li>
            <li onClick={handleLogout}>
              <FaSignOutAlt className="ad-icon" />
              <span>Logout</span>
            </li>
          </ul>
        </nav>

        <main className="ad-main-content">
          <section className="ad-stats-section">
            <div className="ad-stat-card blue">
              <h3>Total Users</h3>
              <p>1,250</p>
              <FaUserCircle className="ad-stat-icon" />
            </div>
            <div className="ad-stat-card green">
              <h3>Active Projects</h3>
              <p>24</p>
              <FaTachometerAlt className="ad-stat-icon" />
            </div>
            <div className="ad-stat-card orange">
              <h3>Pending Requests</h3>
              <p>12</p>
              <FaHandshake className="ad-stat-icon" />
            </div>
            <div className="ad-stat-card red">
              <h3>Issues Reported</h3>
              <p>8</p>
              <FaExclamationCircle className="ad-stat-icon" />
            </div>
          </section>

          <section className="ad-charts-section">
            <div className="ad-chart-container">
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

            <div className="ad-chart-container">
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

          <section className="ad-recent-activity">
            <h3>Recent Activities</h3>
            <div className="ad-activity-list">
              <div className="ad-activity-item">
                <div className="ad-activity-icon">
                  <FaUserCircle />
                </div>
                <div className="ad-activity-details">
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