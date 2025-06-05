import React, { useEffect, useCallback, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../../services/slices/profileSlice";
import { deleteUserProfile } from "../../services/api";
import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "./Profile.css";
import "./confirm-box.css";

const ProfileSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const toast = useRef(null);
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
  //delete profile
  const handleDeleteProfile = () => {
    confirmDialog({
      message:
        "Are you sure you want to delete your profile? This action cannot be undone.",
      header: "Delete Confirmation",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: async () => {
        try {
          await deleteUserProfile();
          toast.current.show({
            severity: "success",
            summary: "Deleted",
            detail: "Your profile was deleted successfully.",
            life: 3000,
          });
          localStorage.removeItem("authToken");
          setTimeout(() => navigate("/signup"), 2000);
        } catch (err) {
          console.error(err);
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Failed to delete profile. Try again.",
            life: 3000,
          });
        }
      },
      reject: () => {
        toast.current.show({
          severity: "info",
          summary: "Cancelled",
          detail: "Profile deletion cancelled",
          life: 3000,
        });
      },
    });
  };

  return (
    <div className="profile-sidebar">
      <Toast ref={toast} />
      <ConfirmDialog />
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
          style={{ borderBottom: "1px solid lightgrey", margin: "20px 0px" }}
        >
          <Link to="/dashboard">
            <li className={currentPath === "/dashboard" ? "active" : ""}>
              Dashboard
            </li>
          </Link>
          <Link to="/dashboard/candidate%20profile">
            <li
              className={
                currentPath === "/dashboard/candidate%20profile" ? "active" : ""
              }
            >
              Edit Profile
            </li>
          </Link>
          <Link
            to={
              user?.role === "employer"
                ? "/dashboard/company-details"
                : "/dashboard/resumeUpload"
            }
          >
            <li
              className={
                currentPath === "/dashboard/resumeUpload" ||
                currentPath === "/dashboard/company-details"
                  ? "active"
                  : ""
              }
            >
              {user?.role === "employer" ? "Company Details" : "Resume"}
            </li>
          </Link>

          <Link
            to={
              user?.role === "employer"
                ? "/dashboard/Jobs-Manager"
                : "/dashboard/applied-jobs"
            }
          >
            <li
              className={
                currentPath === "/dashboard/applied-jobs" ||
                currentPath === "/dashboard/Jobs-Manager"
                  ? "active"
                  : ""
              }
            >
              {user?.role === "employer" ? "Manage Jobs" : "Applied Jobs"}
            </li>
          </Link>
          <Link to="/membership-plans">
            <li className={currentPath === "/membership-plans" ? "active" : ""}>
              Pricing Plans
            </li>
          </Link>
        </div>

        <li className="logout-btn-sidebar" onClick={handleLogout}>
          Log Out
        </li>
        <li onClick={handleDeleteProfile}>Delete Profile</li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
