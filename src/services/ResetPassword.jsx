import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import { httpPost } from "./api"; // adjust this if needed
import { URLS } from "./urls";
import "./ResetPassword.css";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toastRef = useRef(null);

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toastRef.current.show({
        severity: "warn",
        summary: "Password Mismatch",
        detail: "New Password and Confirm Password must match.",
        life: 3000,
      });
      return;
    }
    setLoading(true);

    try {
      const response = await httpPost(URLS.resetPassword(token), {
        newPassword,
      });

      toastRef.current.show({
        severity: "success",
        summary: "Success",
        detail: response.message || "Password reset successfully",
        life: 3000,
      });
    } catch (err) {
      toastRef.current.show({
        severity: "error",
        summary: "Error",
        detail: err.response?.data?.message || "Reset failed",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <Toast ref={toastRef} />
      <div className="reset-password-card">
        <h2>Reset Your Password</h2>
        <p>Please enter your new password below</p>
        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
