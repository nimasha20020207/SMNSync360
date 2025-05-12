import React, { useState } from "react";
import axios from "axios";

function SupplierOrder({ orders = [], setOrders }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredOrders = orders.filter((order) =>
    order.Supplier.toLowerCase().includes(searchTerm)
  );

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

  const iconButtonStyle = (bgColor) => ({
  backgroundColor: bgColor,
  color: "white",
  padding: "4px 8px",
  fontSize: "16px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
});

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "20px" }}>
      <h1 style={{ color: "#0056b3", fontSize: "2.5em", marginBottom: "20px" }}>Pending Orders</h1>

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
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          transition: "0.3s",
          outline: "none",
          backgroundColor: "#ffffff",
        }}
        onFocus={(e) => (e.target.style.border = "2px solid #003d7a")}
        onBlur={(e) => (e.target.style.border = "2px solid #0056b3")}
      />

      <div style={{ width: "90%", overflowX: "auto" }}>
        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          style={{
            width: "100%",
            minWidth: "900px",
            borderCollapse: "collapse",
            border: "2px solid #0056b3",
            backgroundColor: "#ffffff", // No transparency
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#0056b3", color: "white" }}>
              <th>Order Item</th>
              <th>Quantity</th>
              <th>Order Type</th>
              <th>Remarks</th>
              <th>Date</th>
              <th>Supplier</th>
              <th></th>
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
                  <td>{new Date(order.Date).toLocaleDateString()}</td>
                  <td>{order.Supplier}</td>
                  <td>
                    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                      <button
                      onClick={() => handleDelete(order._id)}
                      title="Confirm"
                      //style={iconButtonStyle("#28a745")}
                    >
                      ✅
                    </button>
                    <button
                      onClick={() => handleDelete(order._id)}
                      title="Reject"
                      //style={iconButtonStyle("#dc3545")}
                    >
                      ❌
                    </button>

                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "15px" }}>
                  No matching orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SupplierOrder;
