import React from "react";
import Nav from "../../topnav/mainnav/nav";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./addusr.css";

function AddUser(props) {
  /*if (!props.user) {
    return <div>Loading user data...</div>; // Graceful fallback if user is undefined
  } */

  const { _id,userid, name, email, age, address,userrole,password} = props.user;

  const history = useNavigate();
  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:5000/users/${_id}`)
      .then((res) => res.data)
      .then(() => history("/"))
      .then(() => history("/userdetails"));
  };

  return (
   
      <tr>
      <td>{_id}</td>
      <td>{userid}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{age}</td>
      <td>{address}</td>
      <td>{userrole}</td>
      <td>
        <Link to={`/userdetails/${_id}`}>
          <button className="btn btn-update">Update</button>
        </Link>
        <button className="btn btn-delete" onClick={deleteHandler}>
          Delete
        </button>
      </td>
    </tr>
    
  );
}

export default AddUser;
