import React, { useState, useRef } from "react";
import { resetPassword } from "../../../services/api"; // adjust the path if needed
import { Toast } from "primereact/toast";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resetPassword(email);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Password reset email sent. Check your inbox!",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.message || "Something went wrong",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fp-container">
      <Toast ref={toast} />
      <div className="fp-card">
        {/* Left side with image */}
        <div className="fp-left"></div>

        {/* Right side form */}
        <div className="fp-right">
          <div className="fp-wrapper">
            <h2 className="fp-title">Forgot Password</h2>
            <p className="fp-subtitle">
              Enter your registered email to receive a reset link
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="fp-input"
              />

              <button type="submit" className="fp-button" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
              <div className="fp-back-link">
                <a href="/login">Back to Login</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
