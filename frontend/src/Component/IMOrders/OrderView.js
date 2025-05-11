import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../topnav/IM/Header";
import Footer from "../bottomnav/IM/Footer";
import OrderTable from "./OrderTable";
import background from '../pictures/stock.jpg';

const URL = "http://localhost:5000/Orders";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    console.log("Fetched Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching equipments:", error);
    return { orders: [] };
  }
};

function OrderView() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setOrders(data.orders));
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingTop: "20px",
        paddingBottom: "30px"
      }}
    >
      <Header />

      <div className="text-center mt-3 mb-2">
        <h1 style={{ color: "#0056b3", fontSize: "2.2em" }}>Orders</h1>
      </div>

      <div className="text-center mb-3">
        <p style={{ fontSize: "1em", color: "#333" }}>
          You can edit or cancel your order within 30 minutes after placing it.
          If time has exceeded, please contact the supplier.
        </p>
      </div>

      <div
        className="container-fluid px-3"
        style={{
          maxWidth: "95%",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          padding: "15px",
        }}
      >
        <OrderTable orders={orders} setOrders={setOrders} />
      </div>

      <Footer />
    </div>
  );
}

export default OrderView;
