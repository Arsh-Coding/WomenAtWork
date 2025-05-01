import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toast } from "primereact/toast";
import "../jobStyles/JobCard.css";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useRef(null);
  const isAppliedPage = location.pathname === "/applied-jobs";

  const handleApply = () => {
    navigate(`/apply-job/${job.id}/${job.companyId}`, { state: { job } });
  };
  const handleDetails = () => {
    navigate(`/apply-job/${job.id}/${job.companyId}`, { state: { job } });
  };
  const handleRemove = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/user/remove-applied-job",
        { jobId: job.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (res.data.success) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Job removed from applied list!",
          life: 3000,
        });
        if (onRemove) onRemove(job.id);
      }
      setTimeout(() => (window.location.href = "/"), 3000);
    } catch (err) {
      console.error("Error removing job", err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to remove job. Try again.",
        life: 3000,
      });
    }
  };

  return (
    <div className={`job-card ${job.featured ? "featured" : ""}`}>
      <Toast ref={toast} />
      <div className="job-card-details">
        <h4>{job.title}</h4>
        <div className="job-class-minor-detail">
          <p>{job.location}</p>
          <p>{job.remote ? "Remote" : "On-site"}</p>
        </div>
      </div>
      <div className="button-job-container">
        <p className="date-posted">{job.datePosted}</p>
        {!isAppliedPage ? (
          <button onClick={handleApply}>Apply</button>
        ) : (
          <>
            <button onClick={handleDetails}>Job Details</button>
            <button onClick={handleRemove} className="remove-btn">
              Remove Job
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default JobCard;
