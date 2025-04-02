// frontend/src/App.jsx
import React, { useEffect, useCallback } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Nav from "./Component/topnav/mainnav/nav";
import AddUsr from "./Component/Admin/AddUsr/addusr";
import Users from "./Component/Admin/User Details/Users";
import Home from "./Component/Home/Home";
import AboutUs from "./Component/Admin/AboutUs/AboutUs";
import Admindashboard from "./Component/Admin/Admindashboard/Admindashboard";
import ContactUs from "./Component/Admin/ContactUs/ContactUs";
import Login from "./Component/Login/Login";
import UpdateUser from "./Component/Admin/Updateusers/Updateuser";
import PasswordReset from "./Component/Admin/PasswordReset/PasswordReset";
import PrivateRoute from "./Component/Admin/PrivateRoute/PrivateRoute";
import Appservices from "./Component/Appservices/service";
import ProjectManager from "./Component/Admin/ProjectManager/ProjectManager";
import Clientdashboard from "./Component/Admin/Clientdasboard/client";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const protectedRoutes = [
    "/admindash",
    "/addusr",
    "/userdetails",
    "/userdetails/:id",
    "/pmdash",
    "/clientdash",
    "/supplierdash",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    location.pathname.startsWith(route.split(":")[0])
  );

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
      {!(isLoggedIn && isProtectedRoute) && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mainhome" element={<Home />} />
        <Route path="/log" element={<Login />} />
        <Route path="/passRe" element={<PasswordReset />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/service" element={<Appservices />} />
        <Route
          path="/admindash"
          element={
            <PrivateRoute
              allowedRoles={["admin"]}>
              <Admindashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/addusr"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AddUsr/>
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
        <Route
          path="/pmdash"
          element={
            <PrivateRoute allowedRoles={["projectmanager"]}>
              <ProjectManager/>
            </PrivateRoute>
          }
        />
        <Route
          path="/clientdash"
          element={
            <PrivateRoute allowedRoles={["client"]}>
              <Clientdashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/supplierdash"
          element={
            <PrivateRoute allowedRoles={["supplier"]}>
              <div>Supplier Dashboard</div>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;