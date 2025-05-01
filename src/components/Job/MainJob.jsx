import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchJobs } from "../../services/slices/jobSlice";
import { httpGet } from "../../services/api";
import { URLS } from "../../services/urls";

import JobList from "./jobComponent/JobList";
import JobFilter from "../JobFilter/JobFilter";
import Footer from "../Home/Footer/Footer";

import "./MainJob.css";

const MainJob = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const filters = location.state || {
    keyword: "",
    location: "",
    categoryId: "",
  };

  const jobs = useSelector((state) => state.jobs.jobs);
  const jobStatus = useSelector((state) => state.jobs.status);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch jobs using redux only if not already fetched
    if (jobStatus === "idle") {
      dispatch(fetchJobs());
    }

    // Fetch categories locally
    const fetchCategories = async () => {
      try {
        const response = await httpGet(URLS.categories);
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, [dispatch, jobStatus]);

  useEffect(() => {
    let filtered = jobs;

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
  }, [filters, jobs]);

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
