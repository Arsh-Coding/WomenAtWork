import React, { useEffect } from "react";
import ProfileSidebar from "../ProfileSidebar";
import AddJobForm from "../../EmployerRegister/AddJobs";
import "./jobs-manager.css";
import JobCard from "../../Job/jobComponent/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { getPostedJobs } from "../../../services/api";
import { fetchUserProfile } from "../../../services/slices/profileSlice";
import { fetchJobs } from "../../../services/slices/jobSlice";
import { setJobs } from "../../../services/slices/jobSlice";
const JobsManager = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.profile.user);
  const jobs = useSelector((state) => state.jobs.jobs);

  useEffect(() => {
    const loadData = async () => {
      try {
        await dispatch(fetchUserProfile()).unwrap();
        const response = await getPostedJobs();
        dispatch(setJobs(response.jobs));
      } catch (err) {
        console.error("Error loading data", err);
      }
    };
    loadData();
  }, [dispatch]);
  const companyId = user?.companyDetails?.companyId;
  const postedJobs =
    companyId && jobs?.length > 0
      ? jobs.filter((job) => job.companyId === Number(companyId))
      : [];

  if (!user || !companyId || !jobs) {
    return <p className="submit-btn">Loading your posted jobs...</p>;
  }
  return (
    <>
      <div className="jobs-manager-container">
        <div className="jobs-manager-sidebar">
          <ProfileSidebar />
        </div>
        <div className="jobs-manager-form">
          <div className="applied-jobs">
            <h2>Your Posted Jobs</h2>
            {postedJobs.length === 0 ? (
              <p>You haven't posted any jobs yet.</p>
            ) : (
              postedJobs.map((job) => <JobCard key={job.id} job={job} />)
            )}
          </div>
          <AddJobForm />
        </div>
      </div>
    </>
  );
};

export default JobsManager;
