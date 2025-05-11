// src/pages/PaymentSuccess.js
import React from "react";
import { Link } from "react-router-dom";

function PaymentSuccess() {
  return (
    <div style={{ textAlign: "center", padding: "3rem" }}>
      <h1 style={{ color: "green" }}>✅ Payment Successful!</h1>
      <p>Thank you for your order. Your payment has been processed successfully.</p>
      <Link to="/OrderStatus" style={{ display: "inline-block", marginTop: "2rem", textDecoration: "none", color: "#007bff" }}>
        Back to Home
      </Link>
    </div>
  );
}

export default PaymentSuccess;
