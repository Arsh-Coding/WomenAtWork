import React, { useState, useRef } from "react";
import axios from "axios";
import { Toast } from "primereact/toast";
import "./LoginPage.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const toast = useRef(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form fields
  const validateForm = () => {
    if (!formData.email) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Email Address is required",
        life: 3000,
      });
      return false;
    }
    if (!formData.password) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Password is required",
        life: 3000,
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
        "http://localhost:3000/auth/login",
        formData
      );

      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: response.data.message,
        life: 3000,
      });

      localStorage.setItem("authToken", response.data.token);
      setFormData({ email: "", password: "" });

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: err.response?.data?.message || "An error occurred",
        life: 3000,
      });
    }
  };

  return (
    <div className="login-container">
      <Toast ref={toast} />
      <div className="login-left">
        <div className="illustration">
          <div className="login-woman-with-telescope"></div>
          <div className="arrows">
            <div className="arrow purple"></div>
            <div className="arrow orange"></div>
            <div className="arrow yellow"></div>
          </div>
        </div>
      </div>
      <div className="login-right">
        <h2>Login</h2>
        <p>Enter your details below</p>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          <div className="password-field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <span className="toggle-password">🔒</span>
          </div>
          <div className="form-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="/forgot-password">Forgot password?</a>
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="social-login">
          <p>Login With</p>
          <button className="linkedin">LinkedIn</button>
          <button className="google">Google</button>
        </div>
        <p className="signup-link">
          Not a Member? 
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
