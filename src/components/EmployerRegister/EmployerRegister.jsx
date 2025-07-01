import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast";
import { signupUser } from "../../services/slices/authSlice";

import "./EmployerRegister.css";

const EmployerRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companyId: "",
    phone: "",
    role: "employer",
    jobDescription: "employer",
  });

  const toast = useRef(null);
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { username, email, password, confirmPassword, companyId, phone } =
      formData;

    if (!username) return showToast("error", "Error", "Full Name is required");
    if (!email) return showToast("error", "Error", "Email Address is required");
    if (!password) return showToast("error", "Error", "Password is required");
    if (!companyId)
      return showToast("error", "Error", "Company ID is required");
    if (!confirmPassword)
      return showToast("error", "Error", "Confirm Password is required");
    if (password !== confirmPassword)
      return showToast("error", "Error", "Passwords do not match");
    if (!phone)
      return showToast("error", "Error", "Contact Number is required");
    return true;
  };

  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail, life: 3000 });
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    dispatch(signupUser(formData))
      .unwrap()
      .then(() => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Signup Successful!",
          life: 3000,
        });
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          companyName: "",
          companyId: "",
          phone: "",
        });
        setTimeout(() => (window.location.href = "/company-details"), 2000);
      })
      .catch((error) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: error || "Signup failed",
          life: 3000,
        });
      });
  };

  return (
    <div className="employer-register-container">
      <Toast ref={toast} />
      <div className="employer-register-left">
        <div className="employer-illustration">
          <div className="employer-image"></div>
          <div className="employer-arrows">
            <div className="arrow purple"></div>
            <div className="arrow orange"></div>
            <div className="arrow yellow"></div>
          </div>
        </div>
      </div>
      <div className="employer-register-right">
        <div className="employer-form-wrapper">
          <h2>Employers Sign Up</h2>
          <p>Enter your details below</p>
          <form onSubmit={handleSubmit} className="employer-form">
            <label>Full Name</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your Full Name"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              placeholder="Enter your Company Name"
              value={formData.companyName}
              onChange={handleChange}
              required
            />

            <label>Company ID</label>
            <input
              type="text"
              name="companyId"
              placeholder="Enter Company ID"
              value={formData.companyId}
              onChange={handleChange}
              required
            />

            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <div className="employer-btn-container">
              <button type="submit" className="employer-btn">
                Sign Up
              </button>
              <div className="social-login">
                <p>Sign Up With</p>
                <button className="linkedin">LinkedIn</button>
                <button className="google">Google</button>
              </div>
            </div>
          </form>

          <p className="employer-login-link">
            Already have an account? <Link to="/login">SignIn here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployerRegister;
