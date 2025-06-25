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
        <div className="form-wrapper">
          <h2 className="sr-h2">Sign Up</h2>
          <p className="sr-p">Enter your details below</p>
          <form onSubmit={handleSubmit} className="login-form">
            <p
              style={{
                margin: "2px 0 2px 10px",
                color: "rgba(107, 107, 107, 1)",
              }}
            >
              Full Name
            </p>
            <input
              type="text"
              name="username"
              placeholder="Enter your Full Name"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <p
              style={{
                margin: "2px 0 2px 10px",
                color: "rgba(107, 107, 107, 1)",
              }}
            >
              E-mail address
            </p>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <p
              style={{
                margin: "2px 0 2px 10px",
                color: "rgba(107, 107, 107, 1)",
              }}
            >
              Password
            </p>
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <p
              style={{
                margin: "2px 0 2px 10px",
                color: "rgba(107, 107, 107, 1)",
              }}
            >
              confirm Password
            </p>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-Enter your Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <div className="numberContainer">
              <button className="loginbtn" type="submit">
                Sign Up
              </button>
              <div className="social-login">
                <p>Login With</p>
                <div className="linkedin">LinkedIn</div>
                <div className="google">Google</div>
              </div>
            </div>
            <p className="login-link" style={{ textAlign: "center" }}>
              already having an account?{" "}
              <span>
                <Link to="/login">SignIn here</Link>
              </span>
            </p>
            <Link
              to="/EmployerRegister"
              className="employer-register-link"
              style={{ textAlign: "center" }}
            >
              <button type="button" className="employer-btn">
                Or Register as Employer
              </button>
            </Link>
          </form>
        </div>  
      </div>
    </div>
  );
};

export default SignupPage;
