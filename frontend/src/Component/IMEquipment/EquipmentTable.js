import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EquipmentTable({ equipments = [], setEquipments }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // DELETE function
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/Equipments/${id}`);
      setEquipments((prevEquipments) =>
        prevEquipments.filter((equipment) => equipment._id !== id)
      );
      alert("Equipment deleted successfully!");
    } catch (err) {
      alert("Error deleting equipment: " + err.message);
    }
  };

  // Filtered equipment list based on search
  const filteredEquipments = equipments.filter((equipment) =>
    equipment.EType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "20px" }}>
      <h1 style={{ color: "#0056b3", fontSize: "2.5em", marginBottom: "20px" }}>Equipment Stock</h1>
      
      {/* Styled Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search by Equipment Type"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          padding: "12px",
          width: "50%",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "2px solid #0056b3",
          fontSize: "16px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
          transition: "0.3s",
          outline: "none",
        }}
      />

      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "90%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#0056b3", color: "white" }}>
            <th>Equipment Name</th>
            <th>Equipment Type</th>
            <th>Quantity</th>
            <th>Remarks</th>
            <th>Date</th>
            <th>Supplier</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEquipments.length > 0 ? (
            filteredEquipments.map((equipment, i) => (
              <tr key={i}>
                <td>{equipment.Ename}</td>
                <td>{equipment.EType}</td>
                <td>{equipment.Qty}</td>
                <td>{equipment.Remarks}</td>
                <td>{equipment.Date}</td>
                <td>{equipment.Supplier}</td>
                <td>
                  <button
                    onClick={() => navigate(`/UpdateEquipment/${equipment._id}`)}
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
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(equipment._id)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      padding: "6px 10px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No equipment found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EquipmentTable;
