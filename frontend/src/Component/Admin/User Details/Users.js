import React, { useState, useEffect } from "react";

import axios from "axios";
import AddUser from "../Add User/AddUser";
import './Users.css'
import { Link } from "react-router-dom";
import { FiUserPlus, FiEdit2, FiTrash2 } from "react-icons/fi";

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHandler();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="users-container">
      <div className="users-header">
        <h1 className="users-title">User Management</h1>
        <Link to="/addusr" className="add-user-button">
          <FiUserPlus className="button-icon" />
          Add New User
        </Link>
      </div>

      {isLoading ? (
        <div className="loading-spinner">Loading users...</div>
      ) : (
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Address</th>
                <th>User Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, i) => <AddUser key={i} user={user} />)
              ) : (
                <tr>
                  <td colSpan="8" className="no-users">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Users;