import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "../../services/slices/profileSlice";
import UserCard from "./Dashboard/UserCard";
import ProfileSidebar from "./ProfileSidebar";
import JobAppliedChart from "./Dashboard/JobAppliedChart";
import NotificationsPanel from "./Dashboard/NotificationsPanel";
import JobPieChart from "./Dashboard/JobsPieChart";
import Breadcrumbs from "../BreadCrumbs/Breadcrumbs";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <>
      <div>
        <div className="profile-header">
          <h2>Dashboard</h2>
          <div style={{ marginRight: "8vw", width: "fit-content" }}>
            <Breadcrumbs />
          </div>
        </div>
        <div className="main-dashboard">
          <div className="main-dashboard-sidebar">
            <ProfileSidebar />
          </div>
          <div className="main-dashboard-contentMain">
            <div style={{ maxWidth: "90%" }}>
              <UserCard />
              <JobAppliedChart />
            </div>
            <div style={{ maxWidth: "90%" }}>
              <NotificationsPanel />
              <JobPieChart />
            </div>
          </div>
          {/* <div></div> */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
