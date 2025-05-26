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

  const jobs = useSelector((state) => state.jobs.jobs.jobs);
  const jobStatus = useSelector((state) => state.jobs.status);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const jobsPerPage = 10;
  // console.log("main job page: ", jobs);
  useEffect(() => {
    // Fetch jobs using redux only if not already fetched
    dispatch(
      fetchJobs({ offset: (page - 1) * jobsPerPage, limit: jobsPerPage })
    );

    // Fetch categories locally
    const fetchCategories = async () => {
      try {
        const response = await httpGet(URLS.categories);
        const jobList = response.jobs;
        setCategories(jobList);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, [dispatch, page]);

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

  const totalPages = Math.ceil(
    useSelector((state) => state.jobs.totalJobs) / jobsPerPage
  );

  return (
    <div className="job-search-container">
      <div className="job-Heading">
        <h1>Find Your Dream Job Now</h1>
        <p>5 Lakh+ jobs for you to explore</p>
      </div>
      <div className="jobFilter-prop">
        <JobFilter width={1050} height={150} />
      </div>
      <JobList initialJobs={Array.isArray(filteredJobs) ? filteredJobs : []} />
      <div className="pagination">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default MainJob;
