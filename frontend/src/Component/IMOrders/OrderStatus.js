import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../topnav/IM/Header";
import Footer from "../bottomnav/IM/Footer";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaExclamationTriangle, FaWallet } from "react-icons/fa"; // Import the wallet icon
import background from '../pictures/stock.jpg';

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
    <div>
      <Header />
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          paddingTop: "20px",
          paddingBottom: "30px",
        }}
      >
        <div className="container my-5">
          <table
            className="table table-striped table-bordered table-hover"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr style={{
            backgroundColor: "#003366",
            color: "#fff",
            textAlign: "left"
          }}>
                <th>Order ID</th>
                <th>Details</th>
                <th>Date</th>
                <th>Images</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} style={{ borderBottom: "1px solid #ddd" }}>
                    <td>{order.OrderID}</td>
                    <td>{order.ODetails}</td>
                    <td>{new Date(order.Date).toLocaleDateString()}</td>
                    <td>
                      {order.imagePaths && order.imagePaths.length > 0 ? (
                        <div className="d-flex flex-wrap gap-2">
                          {order.imagePaths.map((imgPath, index) => (
                            <img
                              key={index}
                              src={`http://localhost:5000${imgPath}`} // Make sure this path matches how you're serving images
                              alt={`order-${order._id}-${index}`}
                              style={{
                                height: "60px",
                                width: "60px",
                                objectFit: "cover",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                cursor: "pointer",
                                transition: "transform 0.3s ease",
                              }}
                              onClick={() => window.open(`http://localhost:5000${imgPath}`, "_blank")} // Open full image on click
                              onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
                              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                            />
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted">No images</span>
                      )}
                    </td>
                    <td>{order.OStatus}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => navigate("/AmountEntryForm", { state: { order } })}
                        style={{
                          backgroundColor: "#007bff", // Primary blue color for the button
                          border: "none",
                          borderRadius: "5px",
                          padding: "8px 16px",
                          fontSize: "14px",
                          color: "white",
                          fontWeight: "bold",
                          transition: "background-color 0.3s ease",
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
                      >
                        <FaWallet /> Pay
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-danger">
                    <FaExclamationTriangle className="mr-2" />
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ReadOrders;
