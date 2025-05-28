import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileSidebar from "./ProfileSidebar";
import profileData from "./data/profileData";
import Breadcrumbs from "../BreadCrumbs/Breadcrumbs";
import { apiEndpoint } from "../../services/urls";
import "./Profile.css";

const ResumeUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const user = useSelector((state) => state.profile.user);
  console.log("resume user details: ", user);

  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadResume = async () => {
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      const response = await fetch(`${apiEndpoint}resume/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setFileUrl(data.fileUrl);
        profileData.resume = data.fileUrl;
        alert("Resume uploaded successfully!");
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <>
      <div className="profile-header">
        <h2>Resume</h2>
        <div style={{ marginRight: "8vw", width: "fit-content" }}>
          <Breadcrumbs />
        </div>
      </div>
      <div className="profile-resume-container">
        <div className="resume-sidebar">
          <ProfileSidebar />
        </div>
        <div className="profile-resume-main">
          <h2>Upload Resume</h2>
          <div>
            <input
              className="fileChangeInput"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
            <button className="save-btn-profile" onClick={uploadResume}>
              Upload Resume
            </button>
          </div>
          {user?.resumeUrl ? (
            <iframe
              src={user?.resumeUrl || fileUrl}
              title="Resume Preview"
              width={700}
              height={500}
            />
          ) : (
            <img
              src="/resumedefault.png"
              alt="Resume Preview"
              width={500}
              height={600}
            />
          )}
          <button
            className="resume-submit-btn"
            onClick={() => navigate("/candidate profile")}
          >
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default ResumeUpload;
