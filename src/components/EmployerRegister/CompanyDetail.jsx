import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCompany } from "../../services/slices/companySlice";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../../services/slices/profileSlice";
import {
  fetchCompanyById,
  createOrUpdateCompany,
} from "../../services/slices/companySlice";

const CompanyForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const { companyDetails } = useSelector((state) => state.company);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyId: "",
    companyName: "",
    companyDescription: "",
    companyEmail: "",
    companyWebsite: "",
    companySize: "",
    companyAddress: "",
    companyIndustry: "",
  });

  // const handleChange = (e) => {
  //   setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  // 🔁 Fetch and prefill data
  useEffect(() => {
    const userCompanyId = user?.companyDetails?.companyId;
    if (userCompanyId) {
      dispatch(fetchCompanyById(userCompanyId));
    }
  }, [dispatch, user]);

  // 🧠 Prefill data when companyDetails is available
  useEffect(() => {
    if (companyDetails) {
      setFormData((prevData) => ({
        ...prevData,
        ...companyDetails, // overwrite existing fields if found in DB
      }));
    }
  }, [companyDetails]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const companyData = {
        ...formData,
        createdBy: user._id,
      };

      await dispatch(createOrUpdateCompany(companyData)).unwrap();

      const updatedProfile = {
        ...user,
        companyDetails: companyData,
      };

      await dispatch(updateUserProfile(updatedProfile)).unwrap();

      alert("Company details saved successfully!");
      navigate("/");
    } catch (error) {
      alert("Failed to save company: " + error);
    }
  };

  const fields = [
    { label: "Company Id", name: "companyId" },
    { label: "Company Name", name: "companyName" },
    { label: "Company Description", name: "companyDescription" },
    { label: "Company Email", name: "companyEmail" },
    { label: "Company Website", name: "companyWebsite" },
    { label: "Company Size", name: "companySize" },
    { label: "Company Address", name: "companyAddress" },
    { label: "Company Industry", name: "companyIndustry" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        margin: "12vh auto",
        outline: " 1px solid lightGrey",
        // padding: "0 10px",
      }}
      className="profile-form"
    >
      <h2
        style={{
          backgroundColor: "#e91e63",
          margin: "20px 0",
          height: "50px",
          alignContent: "center",
          paddingLeft: "10px",
          color: "white",
        }}
      >
        Company Information
      </h2>
      {fields.map(({ label, name }) => (
        <div key={name} style={{ marginBottom: "1rem", padding: "0 10px" }}>
          <label
            htmlFor={name}
            style={{
              fontSize: "20px",
              fontWeight: "500",
              display: "block",
              marginBottom: "5px",
            }}
          >
            {label}:
          </label>

          <input
            type="text"
            id={name}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            required={name === "companyId" || name === "companyName"}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
      ))}

      <button
        type="submit"
        style={{
          padding: "0.7rem 1.5rem",
          backgroundColor: "#e91e63",
          border: "none",
          margin: "10px auto",
          color: "white",
          fontWeight: "500",
          display: "block",
        }}
      >
        Save Company
      </button>
    </form>
  );
};

export default CompanyForm;
