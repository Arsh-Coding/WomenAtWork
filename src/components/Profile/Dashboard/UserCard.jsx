import React from "react";
import { useSelector } from "react-redux";
import "../dashboard.css"; // importing the CSS file

const UserCard = () => {
  const { user, status } = useSelector((state) => state.profile);

  if (status === "loading" || !user) {
    return <div className="user-card">Loading user details...</div>;
  }

  return (
    <div className="user-card">
      <div className="user-avatar">
        <img src={user.imageUrl} alt="Profile" />
      </div>
      <div className="user-info">
        <h2>{user.username}</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Job Description:</strong> {user.jobDescription}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
