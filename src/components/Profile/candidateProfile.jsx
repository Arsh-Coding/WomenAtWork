import React, { useState, useEffect, useCallback, useRef } from "react";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProgress } from "../../services/slices/profileSlice";
import "./Profile.css";
import ProfileSidebar from "./ProfileSidebar";
import Breadcrumbs from "../BreadCrumbs/Breadcrumbs";
import { URLS } from "../../services/urls";
import {
  httpGet,
  httpFormPost,
  getAuthHeader,
  getCountries,
  getCitiesByState,
  getStatesByCountry,
} from "../../services/api";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../../services/slices/profileSlice";
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.profile);
  const reduxUser = profileState?.user || null;
  const toast = useRef(null);
  // console.log("reduxUser: ", profileState);

  const status = profileState?.status || "idle"; // ✅ Correct property

  const [profile, setProfile] = useState({
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
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
    imageUrl: "",
  });

  const [sidebarProfile, setSidebarProfile] = useState({
    username: "",
    imageUrl: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [debouncedProfile, setDebouncedProfile] = useState(profile);
  const [selectedFile, setSelectedFile] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [jobs, setJobs] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      navigate("/login"); // Redirect if not authenticated
      return;
    }
    dispatch(fetchUserProfile());
    fetchCountries();
    fetchAllJobs();
  }, [dispatch, navigate]);

  useEffect(() => {
    if (reduxUser) {
      setProfile({
        username: reduxUser.username || "",
        email: reduxUser.email || "",
        phone: reduxUser.phone || "",
        website: reduxUser.website || "",
        jobDescription: reduxUser.jobDescription || "",
        address: reduxUser.address || "",
        country: reduxUser.country || "",
        state: reduxUser.state || "",
        city: reduxUser.city || "",
        zipCode: reduxUser.zipCode || "",
        google: reduxUser.google || "",
        facebook: reduxUser.facebook || "",
        twitter: reduxUser.twitter || "",
        linkedin: reduxUser.linkedin || "",
        verificationEmail: reduxUser.verificationEmail || "",
        imageUrl: reduxUser.imageUrl || "",
        currentPassword: "",
        newPassword: "",
        repeatNewPassword: "",
      });

      setSidebarProfile({
        username: reduxUser.username || "",
        imageUrl: reduxUser.imageUrl || "",
      });
    }
  }, [reduxUser]);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      await handleImageUpload(file);
    }
  };

  const handleImageUpload = async (file) => {
    if (!file) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please Select a file",
        life: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const response = await httpFormPost(URLS.uploadProfilePic, formData, {
        headers: getAuthHeader(),
      });

      // setPreviewUrl(newImageUrl);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail:
          "Profile picture uploaded successfully! Click Save Changes to update your profile.",
        life: 3000,
      });

      setProfile((prevProfile) => ({
        ...prevProfile,
        imageUrl: response.imageUrl,
      }));
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.message || "Failed to upload profile picture.",
        life: 3000,
      });
    }
  };

  const saveChanges = async (e) => {
    e.preventDefault();
    // console.log("Profile data before saving:", profile);
    try {
      await dispatch(
        updateUserProfile({
          username: profile.username,
          email: profile.email,
          phone: profile.phone,
          website: profile.website,
          jobDescription: profile.jobDescription,
          address: profile.address,
          country: profile.country,
          state: profile.state,
          city: profile.city,
          zipCode: profile.zipCode,
          imageUrl: profile.imageUrl,
          google: profile.google,
          facebook: profile.facebook,
          twitter: profile.twitter,
          linkedin: profile.linkedin,
          verificationEmail: profile.verificationEmail,
        })
      ).unwrap();

      dispatch(fetchUserProfile());

      setTimeout(() => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Profile updated successfully",
          life: 3000,
        });
      }, 100);
      // alert("Profile updated successfully!");
      fetchUserProfile();
      fetchCountries();
      if (profile.country) getStatesByCountry(profile.country);
      if (profile.state) getCitiesByState(profile.state);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.response?.message || "Failed to update profile.");
    }
  };

  //Countries

  const fetchCountries = async () => {
    try {
      const response = await getCountries();
      setCountries(response);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
  const handleCountryChange = async (e) => {
    const countryId = e.target.value;
    // console.log(countryId);
    setProfile((prev) => ({
      ...prev,
      country: countryId,
      state: "",
      city: "",
    }));
    setStates([]);
    setCities([]);

    if (countryId) {
      const data = await getStatesByCountry(countryId);
      // setProfile((prev) => ({ ...prev, state: stateId, city: "" })); //this can be done
      // console.log("States fetched: ", data);
      setStates(data);
    }
  };

  const handleStateChange = async (e) => {
    const stateId = e.target.value;
    setProfile((prev) => ({ ...prev, state: stateId, city: "" }));
    // console.log(stateId);
    setCities([]);
    if (stateId) {
      const data = await getCitiesByState(stateId);
      setCities(data);
    }
  };

  useEffect(() => {
    if (profile.country) {
      getStatesByCountry(profile.country).then((data) => {
        setStates(data || []);
      });
    } else {
      setStates([]); // Reset states if no country selected
    }
  }, [profile.country]);

  useEffect(() => {
    if (profile.state) {
      getCitiesByState(profile.state).then((data) => {
        setCities(data || []);
      });
    } else {
      setCities([]); // Reset cities if no state selected
    }
  }, [profile.state]);

  const uploadProfilePic = async () => {
    if (!selectedFile) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please select a file",
        life: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", selectedFile);
    let token = localStorage.getItem("authToken");
    try {
      const response = await httpFormPost(URLS.uploadProfilePic, formData, {
        headers: getAuthHeader(),
      });
      console.log(response.imageUrl);

      setProfile((prevProfile) => ({
        ...prevProfile,
        imageUrl: response.imageUrl,
      }));
      setSidebarProfile((prev) => ({
        ...prev,
        imageUrl: profile.imageUrl,
      }));
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Profile picture updated successfully!",
        life: 3000,
      });
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.message || "Failed to upload profile picture.",
        life: 3000,
      });
    }
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
      case "verificationEmail":
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          error = "Invalid email format";
        }
        break;
      case "phone":
        if (
          !/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
            value
          )
        ) {
          error = "Invalid phone number";
        }
        break;
      case "website":
      case "google":
      case "facebook":
      case "twitter":
      case "linkedin":
        if (
          !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(
            value
          )
        ) {
          error = "Invalid URL";
        }
        break;
      case "zipCode":
        if (!/^[A-Z\d]{3,10}(-[A-Z\d]{3,10})?$/i.test(value)) {
          error = "Invalid zip code";
        }
        break;

      default:
        break;
    }
    return error;
  };

  const DEBOUNCE_DELAY = 500;

  // Debounced validation effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const newErrors = {};
      Object.keys(debouncedProfile).forEach((field) => {
        const error = validateField(field, debouncedProfile[field]);
        if (error) newErrors[field] = error;
      });
      setErrors(newErrors);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [debouncedProfile]);

  // Debounced profile update
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedProfile(profile);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [profile]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  }, []);

  const fetchAllJobs = async () => {
    try {
      const jobsData = await httpGet(URLS.alljobs, {
        headers: getAuthHeader(),
      });
      setJobs(jobsData || []);
    } catch (error) {
      console.error("Error Fetching Jobs:", error);
      setJobs([]);
    }
  };

  const calculateCompletion = useCallback(() => {
    const excludedFields = [
      "currentPassword",
      "newPassword",
      "repeatNewPassword",
      "image",
    ];
    const totalFields = Object.keys(profile).filter(
      (field) => !excludedFields.includes(field)
    ).length;
    const filledFields = Object.keys(profile).filter(
      (field) => !excludedFields.includes(field) && profile[field].trim() !== ""
    ).length;
    const totalPercentageCompleted = Math.round(
      (filledFields / totalFields) * 100
    );
    dispatch(setProgress(totalPercentageCompleted));
    return totalPercentageCompleted;
  }, [profile]);

  const profileCompletion = calculateCompletion();

  const handleSubmit = useCallback(() => {
    // e.preventDefault();
    console.log("clicked");
    const newErrors = {};
    Object.keys(profile).forEach((field) => {
      const error = validateField(field, profile[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);

    if (profileCompletion === 100 && Object.keys(newErrors).length === 0) {
      console.log("Updated Profile:", profile);
      setShowPopup(true);
    } else {
      toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "Please fill all the details and fix errors before submitting",
        life: 3000,
      });
    }
  }, [profileCompletion, errors, profile]);

  if (status === "loading") return <p>Loading profile...</p>;

  // console.log("latest profile testing: ", profile);

  return (
    <>
      <Toast ref={toast} />
      <div className="profile-container">
        <div className="profile-header">
          <h2>Edit Candidate Profile</h2>
          <div style={{ marginRight: "8vw", width: "fit-content" }}>
            <Breadcrumbs />
          </div>
        </div>
        <div className="profile-content">
          <ProfileSidebar />
          <div className="profile-main">
            <form onSubmit={saveChanges} className="profile-form">
              <div className="profile-section_main">
                <div className="profile-preview">
                  <img src={profile.imageUrl} alt="" width={125} />
                  <div style={{ display: "grid", margin: "10px" }}>
                    <p>JPEG or PNG 500x500px thumbnail</p>
                    <label
                      className="profile-button"
                      style={{ cursor: "pointer", textAlign: "center" }}
                    >
                      Upload Image
                      <input
                        type="file"
                        onChange={handleFileSelect}
                        accept="image/*"
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                </div>
                <div className="section-row">
                  <div className="form-entry">
                    <label>Full Name</label>
                    <div className="input-container">
                      <input
                        type="text"
                        name="username"
                        value={profile.username}
                        onChange={handleChange}
                      />
                    </div>
                    <p className="error"></p>
                  </div>
                  <div className="form-entry">
                    <label>Email</label>
                    <div className="input-container">
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.email ? (
                      <p className="error">{errors.email}</p>
                    ) : (
                      <p className="error"></p>
                    )}
                  </div>
                </div>

                <div className="section-row">
                  <div className="form-entry">
                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                    />
                    {errors.phone ? (
                      <p className="error">{errors.phone}</p>
                    ) : (
                      <p className="error"></p>
                    )}
                  </div>
                  <div className="form-entry">
                    <label>Website</label>
                    <input
                      type="text"
                      name="website"
                      value={profile.website}
                      onChange={handleChange}
                    />
                    {errors.website ? (
                      <p className="error">{errors.website}</p>
                    ) : (
                      <p className="error"></p>
                    )}
                  </div>
                </div>

                {/* <div className="profile-section"> */}
                <div className="section-row">
                  <div className="form-entry">
                    <label>Job Description</label>

                    <select
                      name="jobDescription"
                      value={profile.jobDescription}
                      onChange={handleChange}
                    >
                      <option value="">Select a job</option>
                      {jobs.length > 0 ? (
                        jobs.map((job) => (
                          <option key={job._id} value={job._id}>
                            {job.title} - {job.company}
                          </option>
                        ))
                      ) : (
                        <option disabled>No jobs available</option>
                      )}
                    </select>
                    <p className="error"></p>
                  </div>

                  {/* </div> */}

                  {/* <div className="profile-section"> */}

                  <div className="form-entry">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={profile.address}
                      onChange={handleChange}
                    />
                    <p className="error"></p>
                  </div>
                </div>
                <div className="section-row">
                  <div className="form-entry">
                    <label>Country</label>
                    <select
                      name="country"
                      value={profile.country}
                      onChange={handleCountryChange}
                    >
                      <option value="" style={{ color: "black" }}>
                        Select Country
                      </option>
                      {countries.map((c) => (
                        <option key={c.country_id} value={c.country_id}>
                          {c.country_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-entry">
                    <label>State</label>
                    <select
                      name="state"
                      value={profile.state}
                      onChange={handleStateChange}
                      disabled={!profile.country}
                    >
                      <option value="">Select State</option>
                      {states.map((s) => (
                        <option key={s.state_id} value={s.state_id}>
                          {s.state_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="section-row">
                  <div className="form-entry">
                    <label>City</label>
                    <select
                      name="city"
                      value={profile.city}
                      onChange={(e) =>
                        setProfile({ ...profile, city: e.target.value })
                      }
                      disabled={!profile.state}
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city.city_id} value={city.city_name}>
                          {city.city_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-entry">
                    <label>Zip Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={profile.zipCode}
                      onChange={handleChange}
                    />
                    {errors.zipCode ? (
                      <p className="error">{errors.zipCode}</p>
                    ) : (
                      <p className="error"></p>
                    )}
                  </div>
                </div>
              </div>
              <div className="profile-section">
                <h3 style={{ margin: "0" }}>Social Networks</h3>
                <div className="section-row">
                  <div className="form-entry">
                    <label>Google</label>
                    <input
                      type="text"
                      name="google"
                      value={profile.google}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-entry">
                    <label>Facebook</label>
                    <input
                      type="text"
                      name="facebook"
                      value={profile.facebook}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="section-row">
                  <div className="form-entry">
                    <label>Twitter</label>
                    <input
                      type="text"
                      name="twitter"
                      value={profile.twitter}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-entry">
                    <label>LinkedIn</label>
                    <input
                      type="text"
                      name="linkedin"
                      value={profile.linkedin}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="profile-section">
                <h3 style={{ margin: "0", backgroundColor: "#e91e63" }}>
                  Password & Security
                </h3>
                <div className="section-row">
                  <div className="form-entry">
                    <label>Verification Email</label>
                    <input
                      type="email"
                      name="verificationEmail"
                      value={profile.verificationEmail}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-entry">
                    <label>Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={profile.currentPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="section-row">
                  <div className="form-entry">
                    <label>New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={profile.newPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-entry">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      name="repeatNewPassword"
                      value={profile.repeatNewPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="save-btn-profile">
                Save Changes
              </button>
            </form>
          </div>
        </div>
        <div className="profile-apply-class">
          <div>
            <h2>Looking for a job?</h2>
            <p>
              your next level product development company assets your next level
              product
            </p>
          </div>
          <button
            type="submit"
            className="profile-apply-btn"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        {/* Thank You Popup - Only shows if profile is 100% completed */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <button className="close-btn" onClick={() => setShowPopup(false)}>
                ✖
              </button>
              <h2>THANK YOU</h2>
              <p>
                Thank you for applying. Our team is reviewing your CV and will
                get back to you shortly.
              </p>
              <button
                type="submit"
                className="find-more-btn"
                onClick={() => setShowPopup(false)}
              >
                FIND MORE
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
