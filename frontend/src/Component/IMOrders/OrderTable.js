import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OrderTable({ orders = [], setOrders }) {
  const navigate = useNavigate();

  const handleDelete = async (orderId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/Orders/${orderId}`);
      console.log(response.data.message);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      window.alert("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting order:", error);
      window.alert("Failed to delete the item. Please try again.");
    }
  };

  return (
    <div className="table-responsive" style={{ padding: "10px" }}>
      <table className="table table-striped table-hover table-bordered align-middle text-center" style={{ margin: "0 auto", width: "100%" }}>
        <thead className="table-primary">
          <tr>
            <th>Order Item</th>
            <th>Quantity</th>
            <th>Order Type</th>
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
                    className="btn btn-success btn-sm me-2 shadow-sm"
                  >
                    <i className="bi bi-pencil-square"></i> Update
                  </button>
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="btn btn-danger btn-sm shadow-sm"
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrderTable;
