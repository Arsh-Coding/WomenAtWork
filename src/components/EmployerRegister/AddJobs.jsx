import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { httpPost, httpGet, httpPut } from "../../services/api";
import { URLS } from "../../services/urls";
import { fetchJobs } from "../../services/slices/jobSlice";
import "./AddJobForm.css"; // Import the CSS file

const AddJobForm = () => {
  const dispatch = useDispatch();
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    location: "",
    remote: false,
    categoryIds: [],
    jobType: "Full-time",
    companyId: "",
    description: "",
    featured: false,
    salary: "",
    roles: [
      {
        role: "",
        requirements: [""],
        responsibilities: [""],
        optionalConditions: [""],
        importantDetails: [""],
      },
    ],
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await httpGet(URLS.categories);
        setCategories(response);
      } catch (err) {
        console.error("Error found: ", err);
      }
    };
    fetchCategories();
  }, []);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "categoryIds") {
      setFormData({
        ...formData,
        categoryIds: value.split(",").map((id) => Number(id.trim())),
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };
  //fetch existing job data
  useEffect(() => {
    const fetchJobData = async () => {
      if (jobId) {
        try {
          const res = await httpGet(URLS.jobs(jobId));
          setFormData(res?.job);
        } catch (error) {
          console.error("Failed to fetch job for editing", error);
        }
      }
    };
    fetchJobData();
  }, [jobId]);
  const addNewRole = () => {
    setFormData({
      ...formData,
      roles: [
        ...formData.roles,
        {
          role: "",
          requirements: [""],
          responsibilities: [""],
          optionalConditions: [""],
          importantDetails: [""],
        },
      ],
    });
  };

  const handleRoleChange = (index, field, value) => {
    const updatedRoles = [...formData.roles];
    if (
      field === "requirements" ||
      field === "responsibilities" ||
      field === "optionalConditions" ||
      field === "importantDetails"
    ) {
      updatedRoles[index][field] = value.split(",").map((item) => item.trim());
    } else {
      updatedRoles[index][field] = value;
    }

    setFormData({ ...formData, roles: updatedRoles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      datePosted: new Date().toISOString(),
      // companyId: 1,
      // id: Math.floor(Math.random() * 100000),
    };

    try {
      if (jobId) {
        // Updating job
        await httpPut(URLS.updateJob(jobId), payload);
        setMessage("Job updated successfully!");
      } else {
        // Creating job
        await httpPost(URLS.postJob, payload);
        setMessage("Job posted successfully!");
      }
      setError("");
      dispatch(fetchJobs());
      navigate("/dashboard/Jobs-Manager");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to post job");
      setMessage("");
    }
  };
  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  return (
    <div className="form-container" style={{ margin: "auto" }}>
      <h2 className="form-title">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="form-wrapper">
        <input
          name="id"
          placeholder="Job Id"
          value={formData.id}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="input-field"
          required
        />
        <Select
          isMulti
          name="categoryIds"
          options={categoryOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          value={categoryOptions.filter((option) =>
            formData.categoryIds.includes(option.value)
          )}
          onChange={(selectedOptions) =>
            setFormData({
              ...formData,
              categoryIds: selectedOptions.map((option) => option.value),
            })
          }
        />
        <small>
          Hold Ctrl (Windows) or Command (Mac) to select multiple categories
        </small>

        <input
          name="companyId"
          placeholder="Company Id"
          value={formData.companyId}
          onChange={handleChange}
          className="input-field"
        />
        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          className="input-field"
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
        </select>
        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          className="input-field"
          required
        />
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="remote"
            checked={formData.remote}
            onChange={handleChange}
          />
          <span>Remote</span>
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          <span>Featured</span>
        </label>
        {/* role inputs */}
        <h3 className="form-subtitle">Roles</h3>
        {formData.roles.map((roleObj, index) => (
          <div key={index} className="role-block">
            {/* <input
              type="text"
              placeholder="Role Title"
              value={roleObj.role}
              onChange={(e) => handleRoleChange(index, "role", e.target.value)}
              className="input-field"
              required
            /> */}
            <textarea
              placeholder="Requirements (comma-separated)"
              value={roleObj.requirements.join(", ")}
              onChange={(e) =>
                handleRoleChange(index, "requirements", e.target.value)
              }
              className="input-field"
            />
            <textarea
              placeholder="Responsibilities (comma-separated)"
              value={roleObj.responsibilities.join(", ")}
              onChange={(e) =>
                handleRoleChange(index, "responsibilities", e.target.value)
              }
              className="input-field"
            />
            <textarea
              placeholder="Optional Conditions (comma-separated)"
              value={roleObj.optionalConditions.join(", ")}
              onChange={(e) =>
                handleRoleChange(index, "optionalConditions", e.target.value)
              }
              className="input-field"
            />
            <textarea
              placeholder="Important Details (comma-separated)"
              value={roleObj.importantDetails.join(", ")}
              onChange={(e) =>
                handleRoleChange(index, "importantDetails", e.target.value)
              }
              className="input-field"
            />
          </div>
        ))}
        {/* <button type="button" className="submit-btn" onClick={addNewRole}>
          + Add Another Role
        </button> */}
        <button type="submit" className="submit-btn">
          Post Job
        </button>
      </form>
      {message && <p className="success-msg">{message}</p>}
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default AddJobForm;
