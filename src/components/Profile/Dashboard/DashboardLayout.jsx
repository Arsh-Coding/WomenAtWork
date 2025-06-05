import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../../../ProtectedRoute";
// import Navbar from "../../Home/Navbar/Navbar"; // optional

const DashboardLayout = () => {
  return (
    <ProtectedRoute>
      <div className="dashboard-layout">
        {/* Common layout e.g. sidebar, heading, etc. */}
        <Outlet />
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
