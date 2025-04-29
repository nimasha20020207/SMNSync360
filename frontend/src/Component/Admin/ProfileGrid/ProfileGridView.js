
import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Profile icon from react-icons
import '../User Details/Users.css'; // Import Users.css for styling

function ProfileGridView({ users }) {
    console.log('ProfileGridView users prop:', users); // Log the users prop
    if (!users || users.length === 0) {
      return <div className="no-users">No users found</div>;
    }
  
    return (
      <div className="users-grid-container">
        {users.map((user) => (
          <div key={user._id} className="user-profile-card">
            <div className="user-profile-header">
              <FaUserCircle className="user-profile-icon" />
              <h2 className="user-profile-name">{user.name || 'N/A'}</h2>
              <p className="user-profile-role">{user.userrole || 'N/A'}</p>
            </div>
            <div className="user-profile-details">
              <div className="user-profile-detail-item">
                <span className="user-profile-label">User ID:</span>
                <span className="user-profile-value">{user.userid || 'N/A'}</span>
              </div>
              <div className="user-profile-detail-item">
                <span className="user-profile-label">Email:</span>
                <span className="user-profile-value">{user.email || 'N/A'}</span>
              </div>
              <div className="user-profile-detail-item">
                <span className="user-profile-label">Age:</span>
                <span className="user-profile-value">{user.age || 'N/A'}</span>
              </div>
              <div className="user-profile-detail-item">
                <span className="user-profile-label">Address:</span>
                <span className="user-profile-value">{user.address || 'N/A'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
export default ProfileGridView;
