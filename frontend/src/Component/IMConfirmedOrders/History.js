import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";

const URL = "http://localhost:5000/ConfirmedOrders";

function OrderAnalytics() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [currentMonthData, setCurrentMonthData] = useState([]);

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        const orders = response.data.records || [];
        processMonthlyData(orders);
        filterCurrentMonthData(orders);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const processMonthlyData = (orders) => {
    const monthlyCount = {};
    orders.forEach((order) => {
      const date = new Date(order.Date);
      const month = date.toLocaleString("default", { month: "short" });
      const year = date.getFullYear();
      const key = `${month} ${year}`;
      monthlyCount[key] = (monthlyCount[key] || 0) + 1;
    });

    setMonthlyData(
      Object.keys(monthlyCount).map((month) => ({ month, orders: monthlyCount[month] }))
    );
  };

  const filterCurrentMonthData = (orders) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const dailyCount = {};

    orders.forEach((order) => {
      const date = new Date(order.Date);
      if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
        const day = date.getDate();
        dailyCount[day] = (dailyCount[day] || 0) + 1;
      }
    });

    setCurrentMonthData(
      Object.keys(dailyCount).map((day) => ({ day: `Day ${day}`, orders: dailyCount[day] }))
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📊 Order Analytics</h2>

      <div style={{ textAlign: "right", marginBottom: "20px" }}>
        <Link to="/Supplier" style={styles.backButton}>
          🔙 Back to Home
        </Link>
      </div>

      <div style={styles.row}>
        {/* Line Chart - Monthly Orders */}
        <div style={styles.chartCard}>
          <h4 style={styles.chartTitle}>📈 Monthly Orders</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#007bff" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Current Month Orders (Day Wise) */}
        <div style={styles.chartCard}>
          <h4 style={styles.chartTitle}>📊 Daily Orders (April)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={currentMonthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#28a745" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    background: "linear-gradient(to right, #e3f2fd, #f1f8ff)",
    minHeight: "100vh",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#0056b3",
    textAlign: "center",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
    marginBottom: "20px",
  },
  backButton: {
    backgroundColor: "#007bff",
    color: "white",
    fontWeight: "bold",
    borderRadius: "8px",
    padding: "10px 15px",
    textDecoration: "none",
    transition: "0.3s ease-in-out",
    display: "inline-block",
  },
  row: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  chartCard: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "0.3s ease-in-out",
    flex: "1",
    maxWidth: "600px",
    minWidth: "300px",
  },
  chartTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: "15px",
  },
};

export default OrderAnalytics;
