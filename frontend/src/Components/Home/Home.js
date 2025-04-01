import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Header from "../topNav/Header";
import Footer from "../bottomNav/Footer";
import './Home.css';

function Home() {
  const [projectData] = useState([
    { name: "Completed", value: 15, color: "#2ecc71" }, // Green
    { name: "In Progress", value: 8, color: "#f39c12" }, // Orange
    { name: "Not Started", value: 5, color: "#e74c3c" } // Red
  ]);

  return (
    <div className="home-container">
       <Header />
      <div className="home-content">
        <h1 className="welcome-text">Welcome to Saman Constructions</h1>
        <div className="status-card">
          <h2>Project Status Overview</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {projectData.map((entry, index) => (
                  <Bar key={index} dataKey="value" fill={entry.color} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
