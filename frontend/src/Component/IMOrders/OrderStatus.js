import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaExclamationTriangle } from "react-icons/fa"; // Icons for edit and no records

const URL = "http://localhost:5000/ConfirmedOrders"; // API Endpoint

function ReadOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // Fetch Data
  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        console.log("Fetched Data:", response.data); // Debugging
        setOrders(response.data.records); // Fix: Use response.data.records
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4" style={{ color: "#0056b3" }}>
        Order Records
      </h2>

      <div className="card shadow-lg p-4">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-primary">
            <tr>
              <th>Order ID</th>
              <th>Details</th>
              <th>Confirmed Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.OrderID}</td>
                  <td>{order.ODetails}</td>
                  <td>{new Date(order.Date).toLocaleDateString()}</td>
                  <td>{order.OStatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-danger">
                  <FaExclamationTriangle className="mr-2" />
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReadOrders;
