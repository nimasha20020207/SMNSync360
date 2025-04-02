import React, { useState, useEffect } from "react";
//import Nav from "../../topnav/mainnav/nav";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  InputAdornment,
  IconButton
} from "@mui/material";
import { motion } from "framer-motion";

function AddUsr() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    userid: "",
    name: "",
    email: "",
    age: "",
    address: "",
    userrole: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [idPrefix, setIdPrefix] = useState("");

  const userRoles = [
    { value: "admin", label: "Admin", prefix: "AD" },
    { value: "client", label: "Client", prefix: "CL" },
    { value: "sitesupervisor", label: "Site Supervisor", prefix: "SS" },
    { value: "projectManager", label: "Project Manager", prefix: "PM" },
    { value: "quantitysurveyor", label: "Quantity Surveyor", prefix: "QS" },
    { value: "inventorymanager", label: "Inventory Manager", prefix: "IM" },
    { value: "financeofficer", label: "Finance officer", prefix: "FO" },
    { value: "supplier", label: "supplier", prefix: "SP" }
  ];

  useEffect(() => {
    if (inputs.userrole) {
      const role = userRoles.find(r => r.value === inputs.userrole);
      if (role) {
        setIdPrefix(role.prefix);
        setInputs(prev => ({
          ...prev,
          userid: `${role.prefix}${Math.floor(100 + Math.random() * 900)}`
        }));
      }
    }
  }, [inputs.userrole]);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post("http://localhost:5000/users", {
        ...inputs,
        age: Number(inputs.age),
      });
      navigate("/userdetails");
    } catch (err) {
      setError(err.response?.data?.message || "Error adding user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
    
      <Container maxWidth="sm">
        <Paper elevation={6} className="form-container">
          <Typography variant="h5" className="form-title">
            Add New User
          </Typography>
          {error && <Typography color="error" className="error-message">{error}</Typography>}
          <form onSubmit={handleSubmit} className="user-form">
            <FormControl fullWidth className="input-field">
              <InputLabel id="userrole-label">User Role *</InputLabel>
              <Select
                labelId="userrole-label"
                name="userrole"
                value={inputs.userrole}
                onChange={handleChange}
                label="User Role *"
                required
              >
                {userRoles.map((role) => (
                  <MenuItem key={role.value} value={role.value}>
                    {role.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select the user's role</FormHelperText>
            </FormControl>

            <TextField
              label="User ID"
              name="userid"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              value={inputs.userid}
              required
              className="input-field"
              helperText={`Format: ${idPrefix}001 (e.g., AD001 for Admin)`}
              disabled={!!inputs.userrole}
            />

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
              inputProps={{ min: 18, max: 100 }}
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

            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              onChange={handleChange}
              value={inputs.password}
              required
              className="input-field"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                      className="password-toggle"
                    >
                      <span className={`eye-icon ${showPassword ? "visible" : ""}`} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                type="submit" 
                variant="contained" 
                className="submit-btn" 
                fullWidth 
                disabled={loading}
              >
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