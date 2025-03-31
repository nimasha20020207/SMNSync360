// src/Components/Register/Register.js
import React, { useState } from "react";
import Nav from "../../topnav/nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import img2 from "../../pictures/img2.png";

function Register() {
  const navigate = useNavigate(); // Changed from history to navigate
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "client", // Default role
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRequest();
      alert("Register Success");
      navigate("/log", { replace: true });
    } catch (err) {
      console.error("Register error:", err);
      alert("Error: Failed to register. Please ensure the backend is running.");
    }
  };

  const sendRequest = async () => {
    return await axios
      .post(
        "http://localhost:5000/register",
        {
          name: String(user.name),
          email: String(user.email),
          password: String(user.password),
          role: String(user.role),
        },
        { timeout: 5000 } // Set a 5-second timeout
      )
      .then((res) => res.data);
  };

  return (
    <div>
     
      <div className="register-container">
        <div className="register-box">
          <div className="left-side">
            <img src={img2} alt="Register" />
          </div>
          <div className="right-side">
            <h1>User Registration</h1>
            <form onSubmit={handleSubmit}>
              <label>Name</label>
              <input type="text" value={user.name} onChange={handleInputChange} name="name" required />
              <label>Gmail</label>
              <input type="email" value={user.email} onChange={handleInputChange} name="email" required />
              <label>Password</label>
              <input type="password" value={user.password} onChange={handleInputChange} name="password" required />
              <label>Role</label>
              <select value={user.role} onChange={handleInputChange} name="role" required>
                <option value="admin">Admin</option>
                <option value="projectManager">Project Manager</option>
                <option value="client">Client</option>
                <option value="supplier">Supplier</option>
              </select>
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;