import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import JobList from "./jobComponent/JobList";
import Footer from "../Home/Footer/Footer";
import JobFilter from "../JobFilter/JobFilter";
import "./MainJob.css";

const MainJob = () => {
  const location = useLocation();
  const filters = location.state || {
    keyword: "",
    location: "",
    categoryId: "",
  };

  const [jobData, setJobData] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch jobs and categories
  const fetchData = async () => {
    try {
      const [categoryResponse, jobResponse] = await Promise.all([
        axios.get("http://localhost:3000/categories"),
        axios.get("http://localhost:3000/jobs"),
      ]);
      setCategories(categoryResponse.data);
      setJobData(jobResponse.data);
      setFilteredJobs(jobResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Apply filters when jobData or filters change
  useEffect(() => {
    let filtered = jobData;

    if (filters.keyword) {
      filtered = filtered.filter((job) =>
        job.title.toLowerCase().includes(filters.keyword.toLowerCase())
      );
    }

    if (filters.location) {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.categoryId) {
      filtered = filtered.filter((job) =>
        job.categoryIds.includes(Number(filters.categoryId))
      );
    }

    setFilteredJobs(filtered);
  }, [filters, jobData]); // ✅ Include jobData and filters as dependencies

  // Function to filter jobs based on filters
  // const applyFilters = () => {
  //   const filtered = jobData?.filter((job) => {
  //     const matchesKeyword =
  //       !filters.keyword ||
  //       job.title.toLowerCase().includes(filters.keyword.toLowerCase());
  //     const matchesLocation =
  //       !filters.location ||
  //       job.location.toLowerCase() === filters.location.toLowerCase();
  //     const matchesCategory =
  //       !filters.categoryId ||
  //       job.categoryIds.includes(Number(filters.categoryId));

  //     return matchesKeyword && matchesLocation && matchesCategory;
  //   });
  //   // setFilteredJobs(filtered);
  console.log("filters555", filters.categoryId, filteredJobs);

  return (
    <div className="job-search-container">
      <div className="job-Heading">
        <h1>Find Your Dream Job Now</h1>
        <p>5 Lakh+ jobs for you to explore</p>
      </div>
      <div className="jobFilter-prop">
        <JobFilter width={1050} height={150} />
      </div>
      <JobList initialJobs={filteredJobs} />
      <Footer />
    </div>
  );
};

export default MainJob;
