import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../services/slices/authSlice";
import { Toast } from "primereact/toast";
import "./LoginPage.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const toast = useRef(null);
  const dispatch = useDispatch();
  // const { status, error } = useSelector((state) => state.auth);

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

    dispatch(loginUser(formData))
      .unwrap()
      .then((response) => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Login Successful!",
          life: 3000,
        });
        setTimeout(() => (window.location.href = "/"), 2000);
      })
      .catch((err) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: err.response?.message || "An error occurred",
          life: 3000,
        });
      });
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
        <div className="login-header">
          <h2>Login </h2>
          <p>Please login to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
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
            placeholder="Enter your Email here"
            value={formData.email}
            onChange={handleChange}
          />
          <p
            style={{
              margin: "2px 0 2px 10px",
              color: "rgba(107, 107, 107, 1)",
            }}
          >
            Password
          </p>
          <div className="password-field">
            <input
              type="password"
              name="password"
              placeholder="Enter your password here"
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
          <div className="numberContainer">
            <button className="loginbtn" type="submit">
              Login
            </button>
            <div className="social-login">
              <p>Login With</p>
              <div className="linkedin">LinkedIn</div>
              <div className="google">Google</div>
            </div>
          </div>
        </form>
        <p className="signup-link">Not a Member?</p>
      </div>
    </div>
  );
};

export default LoginPage;
