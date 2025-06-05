import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../../services/slices/profileSlice";
import { apiEndpoint } from "../../../services/urls";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const sidebarRef = useRef(null);
  const hamburgerRef = useRef(null);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const location = useLocation(); //React Router provides a useLocation hook that gives you access to the current location object.
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.profile.user);
  const image = user?.imageUrl || `${apiEndpoint}`;

  // useNavigate allows you to change the URL and therefore the displayed component in your React Router application from anywhere in your component, not just within a <Link> component.  This is particularly useful when you need to navigate based on some logic, like a button click, form submission, or the result of an API call.

  useEffect(() => {
    const token = localStorage.getItem("authToken"); //if recieved its truthy else falsy
    // const user = localStorage.setItem("userId", user.userId);
    setisAuthenticated(!!token); //!! converts value of token to boolean (!first false then !true in this case);
    dispatch(fetchUserProfile());
  }, [location]);
  // If token is a truthy value (meaning a token exists), !!token will be true.
  // If token is a falsy value (meaning no token exists), !!token will be false.

  // ✅ Detect click outside sidebar to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setisAuthenticated(false);
    navigate("/login");
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
      {/* main class navbar */}
      <div className="navbar">
        <div className="logo">
          <Link to="/" className="Logo">
            <img src="/logo.png" alt="Logo" />
          </Link>
        </div>
        {/* links start from here */}
        <div
          className={`navLinks ${menuOpen ? "active" : ""}`}
          ref={sidebarRef}
        >
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
                  <Link to="/membership-plans">Pricing</Link>
                  <li>
                    <Link to="/contactUs">Contact</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <div className="profile-icon">
                  <img
                    src={image ? image : "/profilePic.jpg"}
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
        <div className="hamburger" onClick={toggleMenu} ref={hamburgerRef}>
          {menuOpen ? (
            <span style={{ color: "white", fontSize: "24px" }}>&#10005;</span> // ✖
          ) : (
            <span style={{ color: "Black", fontSize: "40px" }}>&#9776;</span> // ☰
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
