import React, { useState, useEffect } from "react";
import Nav from "../../topnav/nav";
import axios from "axios";
import AddUser from "../Add User/AddUser";
import './Users.css'
import { Link } from "react-router-dom";

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};
function Users() {
  const [users, setUsers] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  }, []);

  return (
    <div>
      
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>User Details Page</h2>
      <Link to="/addusr" className="nav-link">
      <button className="btn btn-update">+ Add new user</button>
      </Link>

      {/* Table should be here */}
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
              {users && users.map((user, i) => <AddUser key={i} user={user} />)}
          </tbody>
       
      </table>
    </div>
  );
}

export default Users;
