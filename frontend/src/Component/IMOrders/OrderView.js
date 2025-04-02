import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../topnav/IM/Header";
import Footer from "../bottomnav/IM/Footer";
import OrderTable from "./OrderTable";

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
    <div>
      <Header />
      <OrderTable orders={orders} setOrders={setOrders} />
      <Footer />
    </div>
  );
}

export default OrderView;
