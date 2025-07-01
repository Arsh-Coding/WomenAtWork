import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchJobs } from "../../services/slices/jobSlice";
import { httpGet } from "../../services/api";
import { URLS } from "../../services/urls";
import LoadingJobs from "./jobComponent/LoadingJobs";
import JobList from "./jobComponent/JobList";
import JobFilter from "../JobFilter/JobFilter";
import Footer from "../Home/Footer/Footer";

import "./MainJob.css";

const MainJob = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  // Filters from route state
  const filters = useMemo(() => {
    return {
      keyword: location.state?.keyword || "",
      location: location.state?.location || "",
      categoryId: location.state?.categoryId || "",
    };
  }, [location.state]);

  const [sideFilters, setSideFilters] = useState({
    categories: [],
    jobTypes: [],
  });
  const [page, setPage] = useState(1);
  const jobsPerPage = 10;

  const jobsData = useSelector((state) => state.jobs.jobs); // Actual job data
  const totalJobs = useSelector((state) => state.jobs.totalJobs); // Count from backend
  const jobStatus = useSelector((state) => state.jobs.status);

  const totalPages = Math.ceil(totalJobs / jobsPerPage); // Total pages

  // Fetch jobs with filters and pagination
  useEffect(() => {
    const offset = (page - 1) * jobsPerPage;

    const params = {
      offset,
      limit: jobsPerPage,
      keyword: filters.keyword || "",
      location: filters.location || "",
      categoryId: filters.categoryId || "",
    };

    dispatch(fetchJobs(params));
  }, [dispatch, page, filters]);

  // Fetch categories only once (you can move this to a slice later)
  const [categories, setCategories] = useState([]);
  useEffect(() => {
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
  }, []);

  // Auto-correct if page is too high
  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [totalPages]);

  // console.log("Filters from JobFilter:", location.state);

  return (
    <div className="job-search-container">
      <div className="job-Heading">
        <h1>Find Your Dream Job Now</h1>
        <p>5 Lakh+ jobs for you to explore</p>
      </div>
      <div className="jobFilter-prop">
        <JobFilter width={1050} height={150} />
      </div>
      {jobStatus === "loading" ? (
        <LoadingJobs />
      ) : (
        <JobList
          initialJobs={Array.isArray(jobsData) ? jobsData : []}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          filters={sideFilters}
          setFilters={setSideFilters}
        />
      )}
      {/* {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (pageNum) =>
                pageNum === 1 ||
                pageNum === totalPages ||
                Math.abs(pageNum - page) <= 1
            )
            .reduce((acc, curr, i, arr) => {
              if (i > 0 && curr - arr[i - 1] > 1) acc.push("ellipsis");
              acc.push(curr);
              return acc;
            }, [])
            .map((item, i) =>
              item === "ellipsis" ? (
                <span key={`ellipsis-${i}`} className="ellipsis">
                  ...
                </span>
              ) : (
                <button
                  key={item}
                  onClick={() => setPage(item)}
                  className={page === item ? "active" : ""}
                >
                  {item}
                </button>
              )
            )}

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            &gt;
          </button>
        </div>
      )} */}

      <Footer />
    </div>
  );
};

export default MainJob;
