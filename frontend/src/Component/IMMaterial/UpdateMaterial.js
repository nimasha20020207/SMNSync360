import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const URL = "http://localhost:5000/Materials";

function UpdateMaterial() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [material, setMaterial] = useState({
    Mname: "",
    MID: "",
    Qty: "",
    Remarks: "",
    Date: "",
    Supplier: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const response = await axios.get(`${URL}/${id}`);
        if (response.data && response.data.material) {
          setMaterial(response.data.material);
        } else {
          throw new Error("Material not found");
        }
      } catch (err) {
        setError("Failed to fetch material");
      } finally {
        setLoading(false);
      }
    };
    fetchMaterial();
  }, [id]);

  const handleChange = (e) => {
    setMaterial({ ...material, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${URL}/${id}`, material);
      alert("Material updated successfully!");
      navigate("/MaterialView");
    } catch (err) {
      alert("Error updating material: " + err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <div style={{ width: "400px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#28a745" }}>Update Material</h1> {/* Heading color changed to success green */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "8px" }}>Material Name:</label>
          <input type="text" name="Mname" value={material.Mname || ""} onChange={handleChange} required style={{ padding: "8px", marginBottom: "12px", borderRadius: "4px", border: "1px solid #ccc" }} />

          <label style={{ marginBottom: "8px" }}>Material ID:</label>
          <input type="text" name="MID" value={material.MID || ""} onChange={handleChange} required style={{ padding: "8px", marginBottom: "12px", borderRadius: "4px", border: "1px solid #ccc" }} />

          <label style={{ marginBottom: "8px" }}>Quantity:</label>
          <input type="text" name="Qty" value={material.Qty || ""} onChange={handleChange} required style={{ padding: "8px", marginBottom: "12px", borderRadius: "4px", border: "1px solid #ccc" }} />

          <label style={{ marginBottom: "8px" }}>Remarks:</label>
          <input type="text" name="Remarks" value={material.Remarks || ""} onChange={handleChange} style={{ padding: "8px", marginBottom: "12px", borderRadius: "4px", border: "1px solid #ccc" }} />

          <label style={{ marginBottom: "8px" }}>Date:</label>
          <input type="date" name="Date" value={material.Date || ""} onChange={handleChange} required style={{ padding: "8px", marginBottom: "12px", borderRadius: "4px", border: "1px solid #ccc" }} />

          <label style={{ marginBottom: "8px" }}>Supplier:</label>
          <select name="Supplier" value={material.Supplier || ""} onChange={handleChange} required style={{ padding: "8px", marginBottom: "12px", borderRadius: "4px", border: "1px solid #ccc" }}>
            <option value="">Select Supplier</option>
            <option value="Supplier A">Supplier A</option>
            <option value="Supplier B">Supplier B</option>
            <option value="Supplier C">Supplier C</option>
          </select>

          <button type="submit" style={{ backgroundColor: "#28a745", color: "white", padding: "10px 15px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateMaterial;