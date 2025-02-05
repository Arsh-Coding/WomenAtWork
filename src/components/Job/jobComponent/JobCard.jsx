import React from "react";
import { useNavigate } from "react-router-dom";
import "../jobStyles/JobCard.css";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate(`/apply-job/${job.id}/${job.companyId}`, { state: { job } });
  };

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
        <button onClick={handleApply}>Apply</button>
      </div>
    </div>
  );
};

export default JobCard;
