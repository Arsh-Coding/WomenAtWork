import React, { useState, useEffect } from "react";

import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setisAuthenticated(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setisAuthenticated(false);
    navigate("/login"); //not important;
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isSignupPage =
    location.pathname === "/signup" || location.pathname === "/login";

  const getAuthButtonDetails = () => {
    if (location.pathname === "/signup") {
      return { text: "Login", route: "/login" };
    } else if (location.pathname === "/login") {
      return { text: "Sign Up", route: "/signup" };
    } else {
      return { text: "SignIn/Register", route: "/signup" };
    }
  };

  const authButton = getAuthButtonDetails();

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <Link to="/" className="Logo">
            <img src="/logo.png" alt="Logo" />
          </Link>
        </div>
        <div className={`navLinks ${menuOpen ? "active" : ""}`}>
          <div className="Links">
            <ul>
              {!isSignupPage && ( // Render these links only if not on the Signup page
                <>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <Link to="/aboutUs">About Us</Link>
                  <li>
                    <Link to="/JobPage">Jobs</Link>
                  </li>
                  <Link to="/testimonials">Wow</Link>
                  <li>
                    <Link to="/contactUs">Contact</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          {isAuthenticated ? (
            <>
              <Link to="/profile">
                <div className="profile-icon">
                  <img
                    src="/profilePic.jpg"
                    alt="hello world"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to={authButton.route}>
              <button
                className={
                  location.pathname === "/signup" ? "login-btn" : "signup-btn"
                }
              >
                {authButton.text}
              </button>
            </Link>
          )}
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          &#9776; {/* Hamburger Icon */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
