import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import axios from "axios";
import "./SignupPage.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const toast = useRef(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form fields
  const validateForm = () => {
    const { username, email, password, confirmPassword } = formData;

    if (!username) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Full Name is required",
        life: 3000,
      });
      return false;
    }
    if (!email) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Email Address is required",
        life: 3000,
      });
      return false;
    }
    if (!password) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Password is required",
        life: 3000,
      });
      return false;
    }
    if (!confirmPassword) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Confirm Password is required",
        life: 3000,
      });
      return false;
    }
    if (password !== confirmPassword) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Passwords do not match",
        life: 20000,
      });
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/signup",
        formData
      );
      setSuccess(response.data.message);

      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Sign up successful!",
        life: 3000,
      });

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/");
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: err.response?.data?.error || "An error occurred",
        life: 3000,
      });
    }
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
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
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
