import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import img1 from "../pictures/img.jpeg";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendRequest();
      if (response.status === "ok") {
        alert("Login success");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", response.userrole);
        localStorage.setItem("username", response.username || "User");
        
        const userRole = response.userrole ? response.userrole.toLowerCase() : "";
        switch (userRole) {
          case "admin":
            navigate("/admindash", { replace: true });
            break;
          case "projectmanager":
            navigate("/pmdash", { replace: true });
            break;
          case "client":
            navigate("/clientdash", { replace: true });
            break;
          case "supplier":
            navigate("/supplierdash", { replace: true });
            break;
          default:
            navigate("/log", { replace: true });
        }
      } else {
        alert("Login error: Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Error: Failed to connect to the server. Please ensure the backend is running.");
    }
  };

  const sendRequest = async () => {
    return await axios
      .post(
        "http://localhost:5000/login",
        {
          email: user.email,
          password: user.password,
        },
        { timeout: 5000 }
      )
      .then((res) => res.data);
  };

  return (
    <div>
      <div className="login-container">
        <div className="login-box">
          <div className="left-side">
            <img src={img1} alt="Construction Site" />
          </div>
          <div className="right-side">
            <h1>User Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={user.email}
                  onChange={handleInputChange}
                  name="email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={user.password}
                  onChange={handleInputChange}
                  name="password"
                  required
                />
              </div>
              <button type="submit">Login</button>
            </form>
            <div className="reset-password">
              Request to reset password.{" "}
              <Link to="/passReset" className="click-here">
                Click here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;