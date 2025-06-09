import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../../services/slices/jobSlice";
import "../dashboard.css"; // importing the CSS file

const UserCard = () => {
  const { user, status } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const { jobs, status: jobStatus } = useSelector((state) => state.jobs);
  useEffect(() => {
    if (jobStatus === "idle") {
      dispatch(fetchJobs()); // ✅ dispatch the async thunk
    }
  }, [dispatch, jobStatus]);

  const selectJobs = jobs;
  // console.log(jobs);

  if (status === "loading" || !user) {
    return <div className="user-card">Loading user details...</div>;
  }

  const matchedJob = user?.jobDescription;
  // console.log(matchedJob);

  return (
    <>
      <h2 style={{ margin: "4px 0 20px 0" }}>My Card</h2>
      <div className="user-card">
        <div className="user-avatar">
          <img src={user.imageUrl} alt="Profile" />
        </div>
        <div className="user-info">
          <h2>{user.username}</h2>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Job Description:</strong>{" "}
            {matchedJob ? matchedJob : "Not Assigned"}
          </p>
        </div>
      </div>
    </>
  );
};

export default UserCard;
