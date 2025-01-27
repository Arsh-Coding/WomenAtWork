import React, { useState } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const isSignupPage =
    location.pathname === "/signup" || location.pathname === "/login";
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <img src="./logo.png" alt="Logo" />
        </div>
        <div className={`navLinks ${menuOpen ? "active" : ""}`}>
          <div className="Links">
            <ul>
              {!isSignupPage && ( // Render these links only if not on the Signup page
                <>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>About</li>
                  <li>
                    <Link to="/JobPage">Jobs</Link>
                  </li>
                  <li>WOW</li>
                  <li>Contact</li>
                </>
              )}
            </ul>
          </div>
          <Link to="/signup">
            <button>SignIn/Register</button>
          </Link>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          &#9776; {/* Hamburger Icon */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
