import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiHome, FiKey, FiCalendar, FiSave, FiEye, FiEyeOff } from 'react-icons/fi';
import './UpdateUser.css';

function UpdateUser() {
    const [inputs, setInputs] = useState({
        userrole: '',
        userid: '',
        name: '',
        email: '',
        age: '',
        address: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/users/${id}`);
                setInputs(response.data.users);
            } catch (err) {
                setError('Failed to load user data');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/users/${id}`, inputs);
            navigate("/userdetails");
        } catch (err) {
            setError('Failed to update user');
            console.error(err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    if (isLoading) return <div className="loading">Loading user data...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="update-user-container">
            <div className="update-user-card">
                <h1 className="form-title">
                    <FiUser className="title-icon" />
                    Update User Profile
                </h1>
                
                <form onSubmit={handleSubmit} className="user-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="userrole">User Role</label>
                            <div className="input-with-icon">
                                <FiUser className="input-icon" />
                                <select
                                    id="userrole"
                                    name="userrole"
                                    value={inputs.userrole}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="client">Client</option>
                                    <option value="projectmanager">Project Manager</option>
                                    <option value="sitesupervisor">Site Supervisor</option>
                                    <option value="quantitysurveyor">Quantity Surveyor</option>
                                    <option value="inventorymanager">Inventory Manager</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="userid">User ID</label>
                            <input
                                type="text"
                                id="userid"
                                name="userid"
                                value={inputs.userid}
                                onChange={handleChange}
                                disabled
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={inputs.name}
                                    onChange={handleChange}
                                    required
                                />
                            
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={inputs.email}
                                    onChange={handleChange}
                                    required
                                />
                            
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="age">Age</label>
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    value={inputs.age}
                                    onChange={handleChange}
                                    min="18"
                                    max="100"
                                />
                            
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={inputs.address}
                                    onChange={handleChange}
                                />
                        </div>
                    </div>

                    <div className="form-group password-group">
                        <label htmlFor="password">Password</label>
                        
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={inputs.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <div className="form-actions">
                        <button type="submit" className="submit-btn">
                            <FiSave className="btn-icon" />
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;