
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateNotification() {
  const [inputs, setInputs] = useState({
    notificationid: '',
    type: '',
    Date: '',
    message: '',
    Priority_Level: '',
    Target_Audience: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching notification with ID:', id); // Debug: Log the ID
        const res = await axios.get(`http://localhost:5000/Notification/${id}`);
        console.log('API Response:', res.data); // Debug: Log the response

        // Handle different response structures
        const notification = res.data.notification || res.data; // Check for nested `notification` key
        if (!notification || Object.keys(notification).length === 0) {
          throw new Error('Notification not found or empty response');
        }

        // Format the Date for the input (convert ISO date to YYYY-MM-DD)
        const formattedDate = notification.Date
          ? new Date(notification.Date).toISOString().split('T')[0]
          : '';
        setInputs({
          notificationid: notification.notificationid || '',
          type: notification.type || '',
          Date: formattedDate,
          message: notification.message || '',
          Priority_Level: notification.Priority_Level || '',
          Target_Audience: notification.Target_Audience || '',
        });
      } catch (err) {
        console.error('Error fetching notification:', err);
        setError(err.response?.data?.message || 'Failed to load notification. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    // Convert the Date input (YYYY-MM-DD) to an ISO date string
    const isoDate = inputs.Date ? new Date(inputs.Date).toISOString() : '';
    const updatedData = {
      notificationid: String(inputs.notificationid),
      type: String(inputs.type),
      Date: isoDate,
      message: String(inputs.message),
      Priority_Level: String(inputs.Priority_Level),
      Target_Audience: String(inputs.Target_Audience),
    };
    const res = await axios.put(`http://localhost:5000/Notification/${id}`, updatedData);
    return res.data;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRequest();
      navigate('/notificationdetails'); // Navigate after successful update
    } catch (error) {
      console.error('Error updating notification:', error);
      alert('Failed to update notification. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading notification...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Update Notification</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Notification ID:</label>
          <input
            type="text"
            name="notificationid"
            value={inputs.notificationid}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={inputs.type}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="Date"
            value={inputs.Date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            name="message"
            value={inputs.message}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Priority Level:</label>
          <input
            type="text"
            name="Priority_Level"
            value={inputs.Priority_Level}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Target Audience:</label>
          <input
            type="text"
            name="Target_Audience"
            value={inputs.Target_Audience}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <button type="submit">Update Notification</button>
      </form>
    </div>
  );
}

export default UpdateNotification;
