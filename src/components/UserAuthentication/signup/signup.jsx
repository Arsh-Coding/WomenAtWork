import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { URLS } from "../../../services/urls";
import { httpPost } from "../../../services/api";
import "./SignupPage.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    website: "",
    jobDescription: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    google: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    verificationEmail: "",
    imageUrl: "",
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
    if (!validateForm()) return;

    try {
      const response = await httpPost(URLS.signup, formData);
      debugger;
      console.log(response);
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("userId", response.user?.userId);
      localStorage.setItem("user", JSON.stringify(response.user));

      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Sign up successful!",
        life: 3000,
      });

      setFormData({
        username: "",
        email: "",
        phone: "",
        website: "",
        jobDescription: "",
        address: "",
        country: "",
        state: "",
        city: "",
        zipCode: "",
        google: "",
        facebook: "",
        twitter: "",
        linkedin: "",
        verificationEmail: "",
        imageUrl: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err) {
      console.error("Signup Error:", err); // Debugging

      const errorMessage =
        err?.response?.data?.error ||
        err?.message ||
        "An unexpected error occurred";
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: errorMessage,
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
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
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
