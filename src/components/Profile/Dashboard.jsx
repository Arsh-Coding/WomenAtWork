import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "../../services/slices/profileSlice";
import UserCard from "./Dashboard/UserCard";
import ProfileSidebar from "./ProfileSidebar";
import NotificationsPanel from "./Dashboard/NotificationsPanel";
import JobPieChart from "./Dashboard/JobsPieChart";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <>
      <div className="main-dashboard">
        <div className="main-dashboard-sidebar">
          <ProfileSidebar />
        </div>
        <div className="main-dashboard-contentMain">
          <div>
            <UserCard />
            <JobPieChart />
          </div>
          <NotificationsPanel />
        </div>
        {/* <div></div> */}
      </div>
    </>
  );
};

export default Dashboard;
