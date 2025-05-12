import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OrderTable({ orders = [], setOrders }) {
  const navigate = useNavigate();

  // Function to handle delete request
  const handleDelete = async (orderId) => {
    try {
      // Send DELETE request to backend
      const response = await axios.delete(`http://localhost:5000/Orders/${orderId}`);
      console.log(response.data.message); // Log success message

      // Update the orders list by filtering out the deleted order
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      
      // Show success alert
      window.alert("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting order:", error);
      // Show error alert (optional)
      window.alert("Failed to delete the item. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "20px" }}>
      <h1 style={{ color: "#0056b3", fontSize: "2.5em", marginBottom: "20px" }}>Orders</h1>
      <p>You can edit or cancel your order within 30 minutes after placing it. If time has exceeded, please contact the supplier.</p>

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
          {orders.length > 0 ? (
            orders.map((order, i) => (
              <tr key={i}>
                <td>{order.Itemname}</td>
                <td>{order.Quantity}</td>
                <td>{order.Otype}</td>
                <td>{order.Remarks}</td>
                <td>{order.Date}</td>
                <td>{order.Supplier}</td>
                <td>
                  <button
                    onClick={() => navigate(`/UpdateOrder/${order._id}`)}
                    style={{
                      backgroundColor: "#28a745", // Success green
                      color: "white",
                      padding: "6px 10px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(order._id)} // Delete button click
                    style={{
                      backgroundColor: "#dc3545", // Danger red
                      color: "white",
                      padding: "6px 10px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No materials found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrderTable;
