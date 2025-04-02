import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MaterialsTable({ materials, setMaterials }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // DELETE function
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/Materials/${id}`);
      setMaterials((prevMaterials) => prevMaterials.filter((material) => material._id !== id));
      alert("Material deleted successfully!");
    } catch (err) {
      alert("Error deleting material: " + err.message);
    }
  };

  // Filtered material list based on search
  const filteredMaterials = materials.filter((material) =>
    material.MID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "20px" }}>
      <h1 style={{ color: "#0056b3", fontSize: "2.5em", marginBottom: "20px" }}>Material Stock</h1>
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search by Material ID"
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
      />

      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "90%" }}>
        <thead>
          <tr style={{ backgroundColor: "#0056b3", color: "white" }}>
            <th>Material ID</th>
            <th>Material Name</th>
            <th>Quantity</th>
            <th>Remarks</th>
            <th>Date</th>
            <th>Supplier</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMaterials.length > 0 ? (
            filteredMaterials.map((material) => (
              <tr key={material._id}>
                <td>{material.MID}</td>
                <td>{material.Mname}</td>
                <td>{material.Qty}</td>
                <td>{material.Remarks}</td>
                <td>{material.Date}</td>
                <td>{material.Supplier}</td>
                <td>
                  <button
                    onClick={() => navigate(`/UpdateMaterial/${material._id}`)}
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
                    onClick={() => handleDelete(material._id)}
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
              <td colSpan="7">No materials found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MaterialsTable;
