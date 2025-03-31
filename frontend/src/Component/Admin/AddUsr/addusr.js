import React, { useState } from "react";
import Nav from "../../topnav/nav";
import "./addusr.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";


function AddUsr() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    age: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post("http://localhost:5000/users", {
        name: String(inputs.name),
        email: String(inputs.email),
        age: String(inputs.age),
        address: String(inputs.address),
      });
      navigate("/userdetails");
    } catch (err) {
      setError("Error adding user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
     
      <Container maxWidth="sm">
        <Paper elevation={6} className="form-container">
          <Typography variant="h5" className="form-title">
            Add New User
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <form onSubmit={handleSubmit} className="user-form">
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              value={inputs.name}
              required
              className="input-field"
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              value={inputs.email}
              required
              className="input-field"
            />
            <TextField
              label="Age"
              name="age"
              type="number"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              value={inputs.age}
              required
              className="input-field"
            />
            <TextField
              label="Address"
              name="address"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              value={inputs.address}
              required
              className="input-field"
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button type="submit" variant="contained" className="submit-btn" fullWidth disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
              </Button>
            </motion.div>
          </form>
        </Paper>
      </Container>
    </motion.div>
  );
}

export default AddUsr;
