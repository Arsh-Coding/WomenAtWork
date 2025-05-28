import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../services/slices/profileSlice";
import { fetchJobs, setJobs } from "../../services/slices/jobSlice";
import JobCard from "../Job/jobComponent/JobCard";
import ProfileSidebar from "./ProfileSidebar";
import { getAppliedJobs } from "../../services/api";
import Breadcrumbs from "../BreadCrumbs/Breadcrumbs";
import "./Profile.css";

const AppliedJobs = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.profile.user);
  // console.log(user);

  const jobs = useSelector((state) => state.jobs.jobs);
  // console.log(jobs);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        if (!user) {
          await dispatch(fetchUserProfile()).unwrap();
        }

        if (!Array.isArray(jobs) || jobs.length === 0) {
          const response = await getAppliedJobs(); // Await here!
          dispatch(setJobs(response.jobs)); // response is already the data
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    loadInitialData();
  }, [dispatch]);

  const appliedJobList = Array.isArray(jobs)
    ? jobs.filter((job) =>
        user?.appliedJobs?.some((applied) => applied.jobId === job.id)
      )
    : [];
  // console.log(appliedJobList);

  return (
    <>
      <div className="profile-header">
        <h2>Applied Jobs</h2>
        <div style={{ marginRight: "8vw", width: "fit-content" }}>
          <Breadcrumbs />
        </div>
      </div>
      <div className="applied-jobs-container">
        <div className="applied-jobs-sidebar">
          <ProfileSidebar />
        </div>
        <div className="applied-jobs">
          <h1>Applied Jobs</h1>
          {appliedJobList.length === 0 ? (
            <p>No applied jobs found.</p>
          ) : (
            <div className="job-list">
              {appliedJobList.length > 0 ? (
                appliedJobList.map((job) => <JobCard key={job.id} job={job} />)
              ) : (
                <p>No jobs found matching your criteria.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AppliedJobs;
