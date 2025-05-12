import React, { useEffect, useState } from "react";
import axios from "axios";
import UsersTable from "./UsersTable";
import Header from "../topnav/Header";
import Footer from "../bottomnav/foter";
import pic4 from "../pictures/pic4.jpg"; // Ensure the path is correct

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    console.log("Fetched Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching materials:", error);
    return { Progressusers: [] };
  }
};

function Users() {
  const [Progressusers, setProgressusers] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setProgressusers(data.Progressusers));
  }, []);

  const pageStyle = {
    backgroundImage: `url(${pic4})`, // Add background image
    backgroundSize: "cover", // Ensure the image covers the full background
    backgroundPosition: "center", // Center the image
    backgroundRepeat: "no-repeat", // Don't repeat the image
    minHeight: "100vh", // Ensure the full screen height
    paddingBottom: "4rem", // Add space for the footer
  };

  return (
    <div style={pageStyle}>
      <Header />
      <UsersTable Progressusers={Progressusers} />
      <Footer />
    </div>
  );
}

export default Users;
