import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { httpGet, applyToJob } from "../../services/api";
import { URLS } from "../../services/urls";
import "./ApplyJob.css";
import Footer from "../Home/Footer/Footer";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useSelector } from "react-redux";
import { apiEndpoint } from "../../services/urls";

const ApplyJob = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.profile.user);

  const { jobId, companyId } = useParams();
  const toast = useRef(null);
  // console.log(companyId);

  const [job, setJob] = useState(null);
  const [company, setCompany] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const applicantsPerPage = 5;

  const indexOfLastApplicant = currentPage * applicantsPerPage;
  const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage;
  const currentApplicants = applicants.slice(
    indexOfFirstApplicant,
    indexOfLastApplicant
  );
  const totalPages = Math.ceil(applicants.length / applicantsPerPage);

  const handleApply = async () => {
    try {
      const dateApplied = new Date().toISOString();
      await applyToJob(jobId, dateApplied);

      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Applied Successfully",
        life: 3000,
        position: "top-right",
      });
      navigate("/dashboard/candidate%20profile");
    } catch (e) {
      console.error("Error applying to job", e);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to apply.",
        life: 3000,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [jobData, companyData] = await Promise.all([
          httpGet(URLS.jobs(jobId)),
          httpGet(URLS.companies(companyId)),
        ]);

        setJob(jobData?.job ?? null);
        setCompany(companyData ?? null);
      } catch (error) {
        console.error("Error fetching details:", error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to fetch job/company details",
          life: 3000,
          position: "top-right",
        });
      }
    };

    fetchDetails();
  }, [jobId, companyId]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        // Replace this with your actual method of getting the current user
        // const user = await httpGet(URLS.user());
        setCurrentUser(user);

        if (
          user?.role === "employer" &&
          user?.companyDetails?.companyId === companyId
        ) {
          const applicantsData = await httpGet(
            `${apiEndpoint}applicants/${jobId}`
          );
          console.log(applicantsData);

          setApplicants(applicantsData);
        }
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    fetchApplicants();
  }, [user, jobId, companyId]);

  if (!job) return <h2>Loading job details...</h2>;

  return (
    <>
      <main className="job-details">
        <Toast ref={toast} />

        <div className="apply-job-heading">
          <div>
            <h1>{job?.title ?? "Job Title Not Available"}</h1>
            <p>
              Salary: <strong>{job?.salary ?? "Not specified"}</strong>
            </p>
          </div>

          {currentUser?.role === "employer" &&
          currentUser?.companyDetails?.companyId === companyId ? (
            <button
              className="final-apply"
              onClick={() => navigate(`/edit-job/${jobId}`)}
            >
              Update Job
            </button>
          ) : (
            <button className="final-apply" onClick={handleApply}>
              Apply
            </button>
          )}
        </div>

        <h2>{company?.companyName ?? "Company Name Not Available"}</h2>
        <p>
          {company?.companyDescription ?? "No company description available."}
        </p>
        <p>{job?.description ?? "No job description available."}</p>

        {/* <h2>The Role</h2>
        <ul>
          {job?.roles?.length > 0 ? (
            job.roles.map((role, index) => (
              <li key={index}>{role?.role ?? "Role title not available"}</li>
            ))
          ) : (
            <li>No roles defined.</li>
          )}
        </ul> */}

        <h2>We Imagine that You are:</h2>
        <ul className="apply-job-list">
          {job?.roles?.length > 0 ? (
            job.roles.map((role, i) =>
              role?.requirements?.map((req, j) => (
                <li key={`${i}-req-${j}`}>{req ?? "Requirement missing"}</li>
              ))
            )
          ) : (
            <li>No requirements listed.</li>
          )}
        </ul>

        <h2>Requirements</h2>
        <ul>
          {job?.roles?.length > 0 ? (
            job.roles.map((role, i) =>
              role?.requirements?.map((req, j) => (
                <li key={`${i}-req2-${j}`}>{req ?? "Requirement missing"}</li>
              ))
            )
          ) : (
            <li>No requirements available.</li>
          )}
        </ul>

        <h2>Responsibilities</h2>
        <ul>
          {job?.roles?.length > 0 ? (
            job.roles.map((role, i) =>
              role?.responsibilities?.map((res, j) => (
                <li key={`${i}-res-${j}`}>{res ?? "Responsibility missing"}</li>
              ))
            )
          ) : (
            <li>No responsibilities listed.</li>
          )}
        </ul>

        <h2>Important Details</h2>
        <ul>
          {job?.roles?.length > 0 ? (
            job.roles.map((role, i) =>
              role?.importantDetails?.map((detail, j) => (
                <li key={`${i}-detail-${j}`}>{detail ?? "Detail missing"}</li>
              ))
            )
          ) : (
            <li>No additional details available.</li>
          )}
        </ul>
        {currentUser?.role === "employer" && //conditional rendering
          currentUser?.companyDetails?.companyId === companyId && (
            <section>
              <h2>Applicants</h2>
              {applicants.length > 0 ? (
                <>
                  <table className="applicants-table">
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Resume</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applicants.map((applicant) => (
                        <tr key={applicant._id}>
                          <td>{applicant.username}</td>
                          <td>{applicant.email}</td>
                          <td>{applicant.phone}</td>
                          <td>
                            <a
                              href={applicant.resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Download
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="pagination">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={pageNum === currentPage ? "active" : ""}
                        >
                          {pageNum}
                        </button>
                      )
                    )}
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                </>
              ) : (
                <p>No applicants have applied for this job yet.</p>
              )}
            </section>
          )}
      </main>
      <Footer />
    </>
  );
};

export default ApplyJob;
