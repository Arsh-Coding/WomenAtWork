import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { httpGet } from "../../services/api";
import { URLS } from "../../services/urls";
import "./ApplyJob.css";
import Footer from "../Home/Footer/Footer";

const ApplyJob = () => {
  const navigate = useNavigate();
  const { jobId, companyId } = useParams();
  console.log("company id" + companyId);

  const [job, setJob] = useState(null);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobData = await httpGet(URLS.jobs(jobId));
        setJob(jobData.job);
        setCompany(jobData.company);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    const fetchCompanyDetails = async () => {
      try {
        const companyData = await httpGet(URLS.companies(companyId));
        setCompany(companyData.company);
      } catch (error) {
        console.error("Error fetching company details: ", error);
      }
    };
    fetchJobDetails();
    fetchCompanyDetails();
  }, [jobId, companyId]);

  if (!job) return <h2>Loading job details...</h2>;

  function handleApply(e) {
    navigate("/candidate profile");
  }

  return (
    <>
      <main className="job-details">
        <div className="apply-job-heading">
          <div>
            <h1>{job.title}</h1>
            <p>
              Salary: <strong>{job.salary}</strong>
            </p>
          </div>

          <button className="final-apply" onClick={handleApply}>
            Apply
          </button>
        </div>

        <h2>Company Description</h2>
        <p>{company?.companyDescription || "No company details available."}</p>
        <p>{job?.description || "No job.company details available."}</p>

        <h2>The Role</h2>
        <ul>
          {job?.roles?.map((role, index) => (
            <li key={index}>{role.role}</li>
          ))}
        </ul>
        <p>{job.description}</p>

        <h2>We Imagine that You are:</h2>
        <ul>
          {job.roles.map((role) =>
            role.requirements.map((condition, index) => (
              <li key={index}>{condition}</li>
            ))
          )}
        </ul>

        <h2>Requirements</h2>
        <ul>
          {job.roles.map((role) =>
            role.requirements.map((condition, index) => (
              <li key={index}>{condition}</li>
            ))
          )}
        </ul>

        <h2>Responsibilities</h2>
        <ul>
          {job.roles.map((role) =>
            role.responsibilities.map((condition, index) => (
              <li key={index}>{condition}</li>
            ))
          )}
        </ul>

        <h2>Important Details</h2>
        <ul>
          {job.roles.map((role) =>
            role.importantDetails.map((condition, index) => (
              <li key={index}>{condition}</li>
            ))
          )}
        </ul>
      </main>
      <Footer />
    </>
  );
};

export default ApplyJob;
