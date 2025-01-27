import React, { useState, useEffect } from "react";
import "./MainJob.css";
import Footer from "../Home/Footer/Footer";
import axios from "axios";
import JobList from "./jobComponent/JobList";

const MainJob = () => {
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    categoryId: "",
  });

  const [categories, setCategories] = useState([]);
  const [jobData, setJobData] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Fetch job and category data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await axios.get(
          "http://localhost:3000/categories"
        );
        const jobResponse = await axios.get("http://localhost:3000/jobs");

        setCategories(categoryResponse.data);
        setJobData(jobResponse.data);
        setFilteredJobs(jobResponse.data); // Initialize with all jobs
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Extract unique locations from jobData
  const uniqueLocations = [...new Set(jobData.map((job) => job.location))];

  // Handle input changes for filters
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Apply filters when the "GO" button is clicked
  const applyFilters = () => {
    const filtered = jobData.filter((job) => {
      const matchesKeyword =
        filters.keyword === "" ||
        job.title.toLowerCase().includes(filters.keyword.toLowerCase());
      const matchesLocation =
        filters.location === "" || job.location === filters.location;
      const matchesCategory =
        filters.categoryId === "" ||
        job.categoryIds.includes(Number(filters.categoryId));

      return matchesKeyword && matchesLocation && matchesCategory;
    });

    setFilteredJobs(filtered);
  };

  return (
    <div className="job-search-container">
      <div className="job-container">
        <div className="job-Heading">
          <h1>Find Your Dream Job Now</h1>
          <p>5 Lakh+ jobs for you to explore</p>
        </div>

        <div className="filter-box">
          <div className="section">
            <label>Keywords</label>
            <input
              type="text"
              name="keyword"
              placeholder="Enter job title"
              value={filters.keyword}
              onChange={handleInputChange}
              className="filterBox-entry"
            />
          </div>
          <div className="section">
            <label>Location</label>
            <select
              name="location"
              value={filters.location}
              onChange={handleInputChange}
              className="search-select"
            >
              <option value="">Select your preferred location</option>
              {uniqueLocations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div className="section">
            <label>Area of Expertise</label>
            <select
              name="categoryId"
              value={filters.categoryId}
              onChange={handleInputChange}
              className="search-select"
            >
              <option value="">Select your area of expertise</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button onClick={applyFilters} className="filterBox-btn">
            GO
          </button>
        </div>
      </div>

      {/* Pass the filtered jobs to the JobList component */}
      <JobList initialJobs={filteredJobs} />
      <Footer />
    </div>
  );
};

export default MainJob;
