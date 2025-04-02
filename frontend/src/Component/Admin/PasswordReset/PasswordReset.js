// src/Component/Admin/PasswordReset/PasswordReset.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PasswordReset.css";

function PasswordReset() {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    phoneNumber: "",
    reason: "",
    securityQuestion: "",
    securityAnswer: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    // Add the unique class to the body when this page is rendered
    document.body.classList.add("password-reset-page");

    // Cleanup: Remove the class when leaving the page
    return () => {
      document.body.classList.remove("password-reset-page");
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.usernameOrEmail.trim()) {
      setError("Username or Email Address is required");
      return;
    }

    try {
      const response = await sendRequest();
      if (response.status === "ok") {
        alert("Password reset request sent successfully!");
      } else {
        setError("Error in submitting the request. Please try again.");
      }
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  const sendRequest = async () => {
    return await axios
      .post("http://localhost:5000/password-reset", {
        usernameOrEmail: formData.usernameOrEmail,
        phoneNumber: formData.phoneNumber,
        reason: formData.reason,
        securityQuestion: formData.securityQuestion,
        securityAnswer: formData.securityAnswer,
      })
      .then((res) => res.data);
  };

  return (
    <div className="password-reset-container">
      <h1>Password Reset Request</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="reset-form">
        <label>Username or Email Address:</label>
        <input
          type="text"
          name="usernameOrEmail"
          value={formData.usernameOrEmail}
          onChange={handleChange}
          required
        />
        <label>Phone Number (Optional):</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <label>Reason for Password Change:</label>
        <select
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          required
        >
          <option value="">Select a reason</option>
          <option value="Forgot password">Forgot password</option>
          <option value="Account compromised">Account compromised</option>
          <option value="Other">Other</option>
        </select>
        <label>Security Question (Optional):</label>
        <input
          type="text"
          name="securityQuestion"
          value={formData.securityQuestion}
          onChange={handleChange}
        />
        <label>Security Answer (Optional):</label>
        <input
          type="text"
          name="securityAnswer"
          value={formData.securityAnswer}
          onChange={handleChange}
        />
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}

export default PasswordReset;