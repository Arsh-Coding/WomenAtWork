import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    username: "Luca Wallace",
    email: "luca@example.com",
    phone: "+91 9098085819",
    website: "www.webstrot.com",
    jobDescription: "IT & Computer",
    address: "124A Kalani Bagh",
    country: "India",
    state: "Madhya Pradesh",
    city: "Dewas",
    zipCode: "455001",
    google: "https://google.com/webstrot",
    facebook: "https://www.facebook.com/webstrot",
    twitter: "https://www.twitter.com/webstrot",
    linkedin: "https://www.linkedin.com/webstrot",
    verificationEmail: "webstrot@example.com",
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", profile);
  };

  const calculateCompletion = () => {
    const excludedFields = [
      "currentPassword",
      "newPassword",
      "repeatNewPassword",
    ];
    const totalFields = Object.keys(profile).filter(
      (field) => !excludedFields.includes(field)
    ).length;
    const filledFields = Object.keys(profile).filter(
      (field) => !excludedFields.includes(field) && profile[field].trim() !== ""
    ).length;

    return Math.round((filledFields / totalFields) * 100);
  };

  const profileCompletion = calculateCompletion();

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Edit Candidate Profile</h2>
      </div>
      <div className="profile-content">
        <div className="profile-sidebar">
          <img src="/profilePic.jpg" alt="Profile" className="profile-pic" />
          <h3>{profile.username}</h3>
          <p>@Username</p>
          <p>Profile {profileCompletion}%</p>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${profileCompletion}%` }}
            ></div>
          </div>
          <ul className="sidebar-menu">
            <li>Dashboard</li>
            <li className="active">Edit Profile</li>
            <li>Resume</li>
            <li>Favourite</li>
            <li>Applied Job</li>
            <li>Message</li>
            <li>Pricing Plans</li>
            <li>Log Out</li>
            <li>Delete Profile</li>
          </ul>
        </div>
        <div className="profile-main">
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="profile-section">
              <div className="section-row">
                <div className="form-entry">
                  <label>@Username</label>
                  <input
                    type="text"
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-entry">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="section-row">
                <div className="form-entry">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-entry">
                  <label>Website</label>
                  <input
                    type="text"
                    name="website"
                    value={profile.website}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* <div className="profile-section"> */}
              <div className="section-row">
                <div className="form-entry">
                  <label>Job Description</label>

                  <select
                    name="jobDescription"
                    value={profile.jobDescription}
                    onChange={handleChange}
                  >
                    <option value="IT & Computer">IT & Computer</option>
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>

                {/* </div> */}

                {/* <div className="profile-section"> */}

                <div className="form-entry">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="section-row">
                <div className="form-entry">
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    value={profile.country}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-entry">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={profile.state}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="section-row">
                <div className="form-entry">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={profile.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-entry">
                  <label>Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={profile.zipCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <h3 style={{ margin: "20px 0" }}>Social Networks</h3>
            <div className="profile-section">
              <div className="section-row">
                <div className="form-entry">
                  <label>Google</label>
                  <input
                    type="text"
                    name="google"
                    value={profile.google}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-entry">
                  <label>Facebook</label>
                  <input
                    type="text"
                    name="facebook"
                    value={profile.facebook}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="section-row">
                <div className="form-entry">
                  <label>Twitter</label>
                  <input
                    type="text"
                    name="twitter"
                    value={profile.twitter}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-entry">
                  <label>LinkedIn</label>
                  <input
                    type="text"
                    name="linkedin"
                    value={profile.linkedin}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <h3 style={{ margin: "20px 0", backgroundColor: "#e91e63" }}>
              Password & Security
            </h3>
            <div className="profile-section">
              <div className="section-row">
                <div className="form-entry">
                  <label>Verification Email</label>
                  <input
                    type="email"
                    name="verificationEmail"
                    value={profile.verificationEmail}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-entry">
                  <label>Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={profile.currentPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="section-row">
                <div className="form-entry">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={profile.newPassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-entry">
                  <label>Repeat New Password</label>
                  <input
                    type="password"
                    name="repeatNewPassword"
                    value={profile.repeatNewPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
      <div className="profile-apply-class">
        <div>
          <h2>Looking for a job?</h2>
          <p>
            your next level product development company assets your next level
            product
          </p>
        </div>
        <button className="profile-apply-btn">Submit</button>
      </div>
    </div>
  );
};

export default Profile;
