import React, { useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../../services/slices/profileSlice";
import "./Profile.css";

const ProfileSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const profile = useSelector((state) => state.profile);
  const user = profile?.user || {};
  // const status = profile?.status || "idle";
  // const profileCompletion = profile?.completion || 0;

  useEffect(() => {
    // user is an object {} by default, so check keys
    if (!user || Object.keys(user).length === 0) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch]);

  // console.log("fetching sidebar profile:", profile);

  const calculateCompletion = useCallback(() => {
    const excludedFields = [
      "currentPassword",
      "newPassword",
      "repeatNewPassword",
      "image",
      "appliedJobs",
    ];

    const relevantFields = Object.keys(user).filter(
      (field) => !excludedFields.includes(field)
    );

    const filledFields = relevantFields.filter((field) => {
      const value = user[field];
      if (typeof value === "string") return value.trim() !== "";
      if (typeof value === "number" || typeof value === "boolean") return true;
      return false;
    });

    const totalPercentageCompleted = Math.round(
      (filledFields.length / relevantFields.length) * 100
    );

    return isNaN(totalPercentageCompleted) ? 0 : totalPercentageCompleted;
  }, [user]);

  const profileCompletion = calculateCompletion();
  //logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
    // setisAuthenticated(false);
  };
  //progress
  const progress = useSelector((state) => state.profile.progress);
  const currentPath = location.pathname;
  // console.log("sidebar progress ", progress);

  return (
    <div className="profile-sidebar">
      <img
        src={user?.imageUrl || "/tommy shelby.png"}
        alt="profile pic"
        className="profile-pic"
      />

      <h3>{user?.username}</h3>
      {/* <p>Full Name</p> */}
      <p className="profile-percentage">
        Profile <span>{profileCompletion}%</span>
      </p>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${profileCompletion}%` }}
        ></div>
      </div>
      <ul className="sidebar-menu">
        <div
          style={{ borderBottom: "1px solid lightgrey", marginBottom: "20px" }}
        >
          <Link to="/dashboard">
            <li className={currentPath === "/dashboard" ? "active" : ""}>
              Dashboard
            </li>
          </Link>
          <Link to="/candidate profile">
            <li
              className={currentPath === "/candidate%20profile" ? "active" : ""}
            >
              Edit Profile
            </li>
          </Link>
          <Link to="/resumeUpload">
            <li className={currentPath === "/resumeUpload" ? "active" : ""}>
              Resume
            </li>
          </Link>
          <Link to="/applied-jobs">
            <li className={currentPath === "/applied-jobs" ? "active" : ""}>
              Applied Job
            </li>
          </Link>
          <li className={currentPath === "/pricing-plans" ? "active" : ""}>
            <Link to="/pricing-plans">Pricing Plans</Link>
          </li>
        </div>

        <li className="logout-btn-sidebar" onClick={handleLogout}>
          Log Out
        </li>
        <li>Delete Profile</li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
