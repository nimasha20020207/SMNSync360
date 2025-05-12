import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf"; // Import jsPDF

function PaymentSuccess() {
  const [order, setOrder] = useState(null);
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");

  // Fetch order details from state (this assumes that order details and amount were passed in the state)
  useEffect(() => {
    const paymentDetails = JSON.parse(localStorage.getItem("paymentDetails"));
    if (paymentDetails) {
      setOrder(paymentDetails.order);
      setAmount(paymentDetails.amount);
      setPaymentDate(new Date().toLocaleDateString());
    }
  }, []);

  // Function to generate PDF content
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(16);
    doc.text("Payment Successful Report", 20, 20);

    // Add order details to PDF
    doc.setFontSize(12);
    doc.text(`Order ID: ${order?.OrderID}`, 20, 30);
    doc.text(`Order Details: ${order?.ODetails}`, 20, 40);
    doc.text(`Amount Paid (LKR): ${amount}`, 20, 50);
    doc.text(`Payment Date: ${paymentDate}`, 20, 60);

    // Save the PDF with a filename
    doc.save("payment_report.pdf");
  };

  return (
    <div style={{ textAlign: "center", padding: "3rem" }}>
      <h1 style={{ color: "green" }}>✅ Payment Successful!</h1>
      <p>Thank you for your order. Your payment has been processed successfully.</p>
      <div style={{ marginTop: "2rem" }}>
        <p><strong>Order ID:</strong> {order?.OrderID}</p>
        <p><strong>Order Details:</strong> {order?.ODetails}</p>
        <p><strong>Amount Paid:</strong> LKR {amount}</p>
        <p><strong>Payment Date:</strong> {paymentDate}</p>
      </div>

      {/* Download PDF Button */}
      <button
        onClick={generatePDF}
        style={{
          display: "inline-block",
          marginTop: "2rem",
          padding: "0.5rem 2rem",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        Download Payment Report (PDF)
      </button>

      {/* Link to go back to Home */}
      <div>
        <Link
          to="/OrderStatus"
          style={{
            display: "inline-block",
            marginTop: "2rem",
            textDecoration: "none",
            color: "#007bff",
          }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default PaymentSuccess;
