import React from "react";
import ProfileSidebar from "../ProfileSidebar";
import CompanyForm from "../../EmployerRegister/CompanyDetail";
import "./company-details-dashboard.css";
const CompanyDetailsDashboard = () => {
  return (
    <div className="company-details-dashboard-container">
      <div className="company-details-dashboard-sidebar">
        <ProfileSidebar />
      </div>
      <div className="company-dashboard-content">
        <CompanyForm />
      </div>
    </div>
  );
};

export default CompanyDetailsDashboard;
