import React from 'react';
import OrdersForm from "./OrdersForm";
import Header from "../topnav/IM/Header";
import Footer from "../bottomnav/IM/Footer";
import { useNavigate } from "react-router-dom";

function Orders() {
  const navigate = useNavigate();

  const handleViewOrders = () => {
    navigate('/OrderView'); // Adjust route as needed
  };

  const handleViewOrder2 = () => {
    navigate('/OrderStatus'); // Adjust route as needed
  };
  const handleViewOrder3 = () => {
    navigate('/History'); // Adjust route as needed
  };

  return (
    <div>
      <div className="bg-light min-vh-100 d-flex flex-column">
        <Header />
        <main className="flex-grow-1 container my-4">
          <div className="bg-white shadow-lg rounded-lg p-4 border border-light">
            <div
              style={{
                display: 'flex', 
                justifyContent: 'space-around', // Used space-around for better spacing
                maxWidth: '1000px', // Increased max-width for better alignment on larger screens
                margin: '0 auto', 
                marginBottom: '30px',
                flexWrap: 'wrap', // Ensures responsiveness on smaller screens
                gap: '20px', // Adds space between the cards
              }}
            >
              {/* Card 1: View placed orders */}
              <div 
                style={{
                  backgroundColor: "#e3f2fd", // Light blue background
                  borderRadius: '8px',
                  padding: '20px',
                  textAlign: 'center',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  width: '250px',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onClick={handleViewOrders}
                onMouseOver={(e) => e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)'}
                onMouseOut={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'}
              >
                <p style={{ color: "#1976d2", fontWeight: 'bold' }}>Cancel or Update an Order?</p>
                <p style={{ color: "#0288d1", fontSize: '16px' }}>Want to make an advance payment?</p>
                <button
                  style={{
                    backgroundColor: "#0056b3", // Darker blue for the button
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "14px",
                    width: '100%',
                  }}
                >
                  View placed Orders
                </button>
              </div>

              {/* Card 2: Order Status */}
              <div 
                style={{
                  backgroundColor: "#ffe0b2", // Light orange background
                  borderRadius: '8px',
                  padding: '20px',
                  textAlign: 'center',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  width: '250px',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onClick={handleViewOrder2}
                onMouseOver={(e) => e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)'}
                onMouseOut={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'}
              >
                <p style={{ color: "#ff6f00", fontWeight: 'bold' }}>Want to check the status of your orders?</p>
                <button
                  style={{
                    backgroundColor: "#ff5722", // Darker orange for the button
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "14px",
                    width: '100%',
                  }}
                >
                  Order Status
                </button>
              </div>

              {/* Card 3: Order History */}
              <div 
                style={{
                  backgroundColor: "#f3e5f5", // Light purple background
                  borderRadius: '8px',
                  padding: '20px',
                  textAlign: 'center',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  width: '250px',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onClick={handleViewOrder3}
                onMouseOver={(e) => e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)'}
                onMouseOut={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'}
              >
                <p style={{ color: "#9c27b0", fontWeight: 'bold' }}>View your order history</p>
                <button
                  style={{
                    backgroundColor: "#6a1b9a", // Darker purple for the button
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "14px",
                    width: '100%',
                  }}
                >
                  Order History
                </button>
              </div>
            </div>

            {/* Orders Form */}
            <OrdersForm />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Orders;
