import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./addusr.css";

function AddUser(props) {
  const { _id, userid, name, email, age, address, userrole, password } = props.user;
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const deleteHandler = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setIsDeleting(true);
      try {
        const response = await axios.delete(`http://localhost:5000/users/${_id}`);
        
        if (response.data.success) {
          // First update the parent component's state for immediate UI feedback
          props.onUserDelete && props.onUserDelete(_id);
          
          // Then reload the page after a small delay to ensure smooth transition
          setTimeout(() => {
            window.location.reload();
          }, 5); // 500ms delay to show feedback before reload
        } else {
          alert(response.data.message || "Failed to delete user");
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert(error.response?.data?.message || "Error deleting user");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <tr className="add-user-table-row">
      <td className="add-user-table-cell">{userid}</td>
      <td className="add-user-table-cell">{name}</td>
      <td className="add-user-table-cell">{email}</td>
      <td className="add-user-table-cell">{age}</td>
      <td className="add-user-table-cell">{address}</td>
      <td className="add-user-table-cell">{userrole}</td>
      <td className="add-user-table-cell">
        <Link to={`/userdetails/${_id}`}>
          <button className="add-user-button add-user-button-update">Update</button>
        </Link>
        <button 
          className="add-user-button add-user-button-delete" 
          onClick={deleteHandler}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </td>
    </tr>
  );
}

export default AddUser;