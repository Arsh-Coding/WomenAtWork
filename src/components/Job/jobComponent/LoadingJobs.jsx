import React from "react";
import "../jobStyles/LoadingJobs.css";

const LoadingJobs = () => {
  return (
    <div className="loading-jobs-container">
      {[...Array(6)].map((_, index) => (
        <div className="loading-job-card" key={index}>
          <div className="loading-title shimmer" />
          <div className="loading-lines shimmer" />
          <div className="loading-lines shimmer short" />
        </div>
      ))}
    </div>
  );
};

export default LoadingJobs;
