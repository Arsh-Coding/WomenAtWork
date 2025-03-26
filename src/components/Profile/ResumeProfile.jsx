import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";
import profileData from "./data/profileData";

const ResumeUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const navigate = useNavigate();

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
      const response = await fetch("http://localhost:3000/resume/upload", {
        method: "POST",
        body: formData,
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
    <div className="profile-container">
      <ProfileSidebar />
      <div className="profile-main">
        <h2>Upload Resume</h2>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
        <button onClick={uploadResume}>Upload Resume</button>
        {fileUrl && (
          <p>
            Uploaded File:{" "}
            <a href={fileUrl} target="_blank">
              View Resume
            </a>
          </p>
        )}
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    </div>
  );
};

export default ResumeUpload;
