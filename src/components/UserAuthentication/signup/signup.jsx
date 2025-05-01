import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast";
import { signupUser } from "../../../services/slices/authSlice";

import "./SignupPage.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toast = useRef(null);
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form fields
  const validateForm = () => {
    const { username, email, password, confirmPassword } = formData;

    if (!username) return showToast("error", "Error", "Full Name is required");
    if (!email) return showToast("error", "Error", "Email Address is required");
    if (!password) return showToast("error", "Error", "Password is required");
    if (!confirmPassword)
      return showToast("error", "Error", "Confirm Password is required");
    if (password !== confirmPassword)
      return showToast("error", "Error", "Passwords do not match");
    return true;
  };

  const showToast = (severity, summary, detail) => {
    toast.current.show({ severity, summary, detail, life: 3000 });
    return false;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signupUser(formData))
      .unwrap()
      .then(() => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "SignUp Successfull!",
          life: 3000,
        });
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setTimeout(() => (window.location.href = "/"), 2000);
      })
      .catch((error) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: error || "signup failed",
          life: 3000,
        });
      });
  };

  return (
    <div className="signup-container">
      <Toast ref={toast} />
      <div className="signup-left">
        <div className="illustration">
          <div className="woman-with-telescope"></div>
          <div className="arrows">
            <div className="arrow purple"></div>
            <div className="arrow orange"></div>
            <div className="arrow yellow"></div>
          </div>
        </div>
      </div>

      <div className="signup-right">
        <h2>Sign Up</h2>
        <p>Enter your details below</p>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>

        <div className="social-login">
          <p>Sign Up With</p>
          <button className="linkedin">LinkedIn</button>
          <button className="google">Google</button>
        </div>
        <p className="login-link">
          already having an account?{" "}
          <span>
            <Link to="/login">SignIn here</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
