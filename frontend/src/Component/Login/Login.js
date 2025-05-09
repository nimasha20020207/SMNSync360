import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import Nav from "../topnav/mainnav/nav";
import img1 from "../pictures/img.jpeg";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters long";
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate the changed field
    if (name === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    } else if (name === "password") {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate on blur
    if (name === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    } else if (name === "password") {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const emailError = validateEmail(user.email);
    const passwordError = validatePassword(user.password);

    setErrors({ email: emailError, password: passwordError });
    setTouched({ email: true, password: true });

    if (emailError || passwordError) {
      return;
    }

    try {
      const response = await sendRequest();
      if (response.status === "ok") {
        console.log(response)
        alert("Login success");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", response.userrole);
        localStorage.setItem("username", response.username || "User");
        localStorage.setItem("userid", response.userIds);
        localStorage.setItem("userids", response.userId || "userids");

    
        const userRole = response.userrole
          ? response.userrole.toLowerCase()
          : "";
        switch (userRole) {
          case "admin":
            navigate("/admindash", { replace: true });
            break;
          case "client":
            navigate("/clientdash", { replace: true });
            break;
          case "quantitysurveyor":
            navigate("/qsdash", { replace: true });
            break;
          case "financeofficer":
            navigate("/fodash", { replace: true });
            break;
          case "inventorymanager":
            navigate("/imdash", { replace: true });
            break;
          case "projectmanager":
            navigate("/pamdash", { replace: true });
            break;
          case "supplier":
            navigate("/supplierdash", { replace: true });
            break;
          case "sitesupervisor":
            navigate("/ssdash", { replace: true });
            break;
          default:
            navigate("/log", { replace: true });
        }
      } else {
        alert("Login error: Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(
        "Error: Failed to connect to the server. Please ensure the backend is running."
      );
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
      <Nav />
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
                  onBlur={handleBlur}
                  name="email"
                  className={touched.email && errors.email ? "input-error" : ""}
                />
                {touched.email && errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={user.password}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  name="password"
                  className={touched.password && errors.password ? "input-error" : ""}
                />
                {touched.password && errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
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