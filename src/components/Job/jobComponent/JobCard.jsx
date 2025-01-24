import React from "react";
import "../jobStyles/JobCard.css";

const JobCard = ({ job }) => {
  return (
    <div className={`job-card ${job.featured ? "featured" : ""}`}>
      <div className="job-card-details">
        <h4>{job.title}</h4>
        <div className="job-class-minor-detail">
          <p>{job.location}</p>
          <p>{job.remote ? "Remote" : "On-site"}</p>
        </div>
      </div>
      <div className="button-job-container">
        <p className="date-posted">{job.datePosted}</p>
        <button>Apply</button>
      </div>
    </div>
  );
};

export default JobCard;
