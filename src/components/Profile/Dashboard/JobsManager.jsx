import React, { useEffect } from "react";
import ProfileSidebar from "../ProfileSidebar";
import AddJobForm from "../../EmployerRegister/AddJobs";
import "./jobs-manager.css";
import JobCard from "../../Job/jobComponent/JobCard";
import { useDispatch, useSelector } from "react-redux";
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
        const response = await dispatch(fetchJobs()).unwrap();
        dispatch(setJobs(response));
      } catch (err) {
        console.error("error loading data ", err);
      }
    };
    loadData();
  }, [dispatch]);
  const companyId = user?.companyDetails?.companyId;
  const postedJobs =
    jobs?.filter((job) => job.companyId === Number(companyId)) || [];
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
