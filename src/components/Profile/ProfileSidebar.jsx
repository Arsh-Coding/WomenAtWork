import React from "react";
import { Link } from "react-router-dom";

const ProfileSidebar = ({ profile, profileCompletion, handleLogout }) => {
  return (
    <div className="profile-sidebar">
      <img
        src={profile.imageUrl || "/profilePic.jpg"}
        alt="profile pic"
        className="profile-pic"
      />

      <h3>{profile.username}</h3>
      {/* <p>Full Name</p> */}
      <p className="profile-percentage">
        Profile <span>{profileCompletion}%</span>
      </p>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${profileCompletion}%` }}
        ></div>
      </div>
      <ul className="sidebar-menu">
        <div
          style={{ borderBottom: "1px solid lightgrey", marginBottom: "20px" }}
        >
          <li>Dashboard</li>
          <Link to="/candidate profile">
            <li className="active">Edit Profile</li>
          </Link>
          <Link to="/resumeUpload">
            <li>Resume</li>
          </Link>
          <li>Applied Job</li>
          <li>Pricing Plans</li>
        </div>

        <li onClick={handleLogout}>Log Out</li>
        <li>Delete Profile</li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
