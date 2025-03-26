import React from "react";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("authToken");
  // console.log(children);

  return isAuthenticated && isAuthenticated !== "null" ? (
    // console.log(children);
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
