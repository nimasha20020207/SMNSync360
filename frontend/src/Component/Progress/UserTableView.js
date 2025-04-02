import React, { useEffect, useState } from "react";
import axios from "axios";
import UsersTable from "./UsersTable";
import Header from '../topnav/Header';
import Footer from '../bottomnav/foter';

const URL = "http://localhost:5000/progress";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    console.log("Fetched Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching materials:", error);
    return { getAllProgressUsers: [] };
  }
};

function Users() {
  const [Progressusers, setProgressusers] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setProgressusers(data.Progressusers));
  }, []);

  return (
    <div>
      <Header/>
      <h1>Progress recode</h1>
      <UsersTable Progressusers={Progressusers} />
      <Footer/>
    </div>
  );
}

export default Users;