import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toast } from "primereact/toast";
import { useSelector } from "react-redux";
import "../jobStyles/JobCard.css";
import { apiEndpoint } from "../../../services/urls";

const formatPostedDate = (dateString) => {
  const now = new Date();
  const postedDate = new Date(dateString);
  const diffInMs = now - postedDate;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 30) {
    return diffInDays === 0
      ? "Today"
      : diffInDays === 1
      ? "1 day ago"
      : `${diffInDays} days ago`;
  }

  return postedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useRef(null);
  const isAppliedPage = location.pathname === "/dashboard/applied-jobs";
  // console.log(job);

  const user = useSelector((state) => state.profile);
  const userProfile = user.user;
  const companyRole = userProfile?.role;
  const isEmployer = companyRole === "employer";

  const jobCompany = parseInt(job?.companyId);
  const userCompanyId = userProfile?.companyDetails?.companyId
    ? parseInt(userProfile.companyDetails.companyId)
    : null;
  // console.log(jobCompany === userCompanyId);

  // console.log(isEmployer);

  const handleApply = () => {
    navigate(`/apply-job/${job.id}/${job.companyId}`, { state: { job } });
  };
  const handleDetails = () => {
    navigate(`/apply-job/${job.id}/${job.companyId}`, { state: { job } });
  };

  const handleRemove = async () => {
    try {
      if (isEmployer) {
        // DELETE JOB from DB (for employers)
        const res = await axios.post(
          `${apiEndpoint}user/delete-job`,
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
            summary: "Job Deleted",
            detail: "Job successfully removed",
            life: 3000,
          });
          setTimeout(() => window.location.reload(), 3000);
        }
      } else {
        // REMOVE FROM APPLIED JOBS (existing logic for candidates)
        const res = await axios.post(
          `${apiEndpoint}user/remove-applied-job`,
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
          setTimeout(() => window.location.reload(), 3000);
        }
      }
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

  const dateOnly = formatPostedDate(job.datePosted);

  let appliedDate = null;
  if (isAppliedPage && userProfile?.appliedJobs?.length > 0) {
    const match = userProfile.appliedJobs.find(
      (applied) => applied.jobId === job.id
    );
    if (match) {
      appliedDate = formatPostedDate(match.dateApplied);
    }
  }
  // console.log("applied date: ", userProfile?.appliedJobs?.length);
  const isOwnJob = isEmployer && jobCompany === userCompanyId;

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
        {!isAppliedPage && !isEmployer ? (
          <>
            <p className="date-posted">{dateOnly}</p>
            <button onClick={handleApply}>Apply</button>
          </>
        ) : isOwnJob ? (
          <>
            <p className="date-posted">{`Posted on: ${dateOnly}`}</p>
            <button onClick={handleDetails}>Edit</button>
            <button onClick={handleRemove} className="remove-btn">
              Remove Job
            </button>
          </>
        ) : !isEmployer ? (
          <>
            <p className="date-posted">{dateOnly}</p>
            <button onClick={handleApply}>View</button>
          </>
        ) : (
          <>
            <>
              <p className="date-posted">{dateOnly}</p>
              <button
                onClick={handleApply}
                disabled
                style={{ display: "none" }}
              >
                View
              </button>
            </>
          </>
        )}
      </div>
    </div>
  );
};

export default JobCard;
