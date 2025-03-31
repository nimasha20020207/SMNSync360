import React, {useEffect,useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router'
import { useNavigate } from 'react-router'
import  './UpdateUser.css';



function Updateuser() {

    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        age: '',
        address: '',
    });
    const history = useNavigate();
    const { id } = useParams();

    useEffect(()=>{
        const fetchHandler=async()=>{
            await axios
            .get(`http://localhost:5000/users/${id}`)
            .then((res)=>res.data)
            .then((data)=>setInputs(data.users));
        };
        fetchHandler();
    },[id]);

    const sendRequest=async ()=>{
        await axios
        .put(`http://localhost:5000/users/${id}`,{
            name: String(inputs.name),
            email: String(inputs.email),
            age: String(inputs.age),
            address: String(inputs.address),
        })

         .then((res)=>res.data);
    };

    const handleChange=(e)=>{
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value,
        }));
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(()=>
        history("/userdetails"));
    };


  return (
    <div className="update-user-form">
      <h2>Update user details</h2>
      <form onSubmit={handleSubmit}>
            <label>Name:</label><br></br>
            <input type='text' name="name" id="name" onChange={handleChange} value={inputs.name} ></input><br></br>
            <label>Email:</label><br></br>
            <input type='email' name="email" id="email" onChange={handleChange} value={inputs.email} ></input><br></br>
            <label>Age:</label><br></br>
            <input type='text' name="age" id="age" onChange={handleChange} value={inputs.age} ></input><br></br>
            <label>Address:</label><br></br>
            <input type='text' name="address" id="address" onChange={handleChange} value={inputs.address} ></input><br></br>
            <button value="submit">Submit</button>
        </form>
    </div>
  );
}

export default Updateuser;
