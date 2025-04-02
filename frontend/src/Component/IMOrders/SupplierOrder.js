import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import axios from "axios";

function SupplierOrder({ orders = [], setOrders }) {
  //const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // Convert input to lowercase
  };

  // Filter orders based on supplier name
  const filteredOrders = orders.filter((order) =>
    order.Supplier.toLowerCase().includes(searchTerm)
  );

  // Handle delete request
  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/Orders/${orderId}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      window.alert("You took action on this order");
    } catch (error) {
      console.error("Error deleting order:", error);
      window.alert("Failed to delete the item. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "20px" }}>
      <h1 style={{ color: "#0056b3", fontSize: "2.5em", marginBottom: "20px" }}>Pending Orders</h1>

      {/* Search Bar with Better Styling */}
      <input
        type="text"
        placeholder="🔍 Search by Supplier"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          padding: "12px",
          width: "50%",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "2px solid #0056b3",
          fontSize: "16px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Adds subtle shadow
          transition: "0.3s",
          outline: "none",
        }}
        onFocus={(e) => (e.target.style.border = "2px solid #003d7a")} // Focus effect
        onBlur={(e) => (e.target.style.border = "2px solid #0056b3")} // Reverts back after focus
      />

      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        style={{ width: "80%", borderCollapse: "collapse", border: "2px solid #0056b3" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#0056b3", color: "white" }}>
            <th>Order Item</th>
            <th>Quantity</th>
            <th>Order type</th>
            <th>Remarks</th>
            <th>Date</th>
            <th>Supplier</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, i) => (
              <tr key={i}>
                <td>{order.Itemname}</td>
                <td>{order.Quantity}</td>
                <td>{order.Otype}</td>
                <td>{order.Remarks}</td>
                <td>{order.Date}</td>
                <td>{order.Supplier}</td>
                <td>
                  <button
                    onClick={() => handleDelete(order._id)}
                    style={{
                      backgroundColor: "#28a745",
                      color: "white",
                      padding: "6px 10px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleDelete(order._id)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      padding: "6px 10px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No matching orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SupplierOrder;
