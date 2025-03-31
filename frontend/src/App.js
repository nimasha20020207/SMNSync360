// App.jsx
import React, { useEffect, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Nav from "./Component/topnav/nav"; // Verify this path
import Fot from "./Component/bottomnav/foter";
import AddUsr from "./Component/Admin/AddUsr/addusr";
import Users from "./Component/Admin/User Details/Users";
import Home from "./Component/Home/Home";
import AboutUs from "./Component/Admin/AboutUs/AboutUs";
import Admindashboard from "./Component/Admin/Admindashboard/Admindashboard";
import ContactUs from "./Component/Admin/ContactUs/ContactUs";
import Login from "./Component/Login/Login";
import UpdateUser from "./Component/Admin/Updateusers/Updateuser";
import Register from "./Component/Admin/Register/Register";
import PasswordReset from "./Component/Admin/PasswordReset/PasswordReset";
import PrivateRoute from "./Component/Admin/PrivateRoute/PrivateRoute";
import Appservices from "./Component/Appservices/service"

function App() {
  const navigate = useNavigate();

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handlePopstate = useCallback(
    debounce(() => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (!isLoggedIn) {
        navigate("/log", { replace: true });
      }
    }, 300),
    [navigate]
  );

  useEffect(() => {
    window.addEventListener("popstate", handlePopstate);
    return () => window.removeEventListener("popstate", handlePopstate);
  }, [handlePopstate]);

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mainhome" element={<Home />} />
        <Route path="/regi" element={<Register />} />
        <Route path="/log" element={<Login />} />
        <Route path="/passRe" element={<PasswordReset />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/service" element={<Appservices />} />
        <Route
          path="/admindash"
          element={
            <PrivateRoute allowedRoles={["admin", "projectManager", "client", "supplier"]}>
              <Admindashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/addusr"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AddUsr />
            </PrivateRoute>
          }
        />
        <Route
          path="/userdetails"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path="/userdetails/:id"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <UpdateUser />
            </PrivateRoute>
          }
        />
      </Routes>
     
    </>
  );
}

export default App;