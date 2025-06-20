import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import Filters from "./Filters";
import "../jobStyles/JobList.css";
import { jobData, categories as categoryList } from "../JobData/JobData";

const JobList = ({ initialJobs, page, setPage, totalPages }) => {
  const [filters, setFilters] = useState({
    categories: [],
    jobTypes: [],
  });
  console.log(initialJobs, page, setPage, totalPages);

  const [displayJobs, setDisplayJobs] = useState(initialJobs);

  // Extract unique job types dynamically from jobData
  const jobTypes = [...new Set(jobData.map((job) => job.jobType))];

  useEffect(() => {
    setDisplayJobs(initialJobs);
  }, [initialJobs]);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const updated = prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value];

      return { ...prev, [type]: updated };
    });
  };

  useEffect(() => {
    const filteredJobs = initialJobs.filter((job) => {
      const matchesCategory =
        filters.categories.length === 0 ||
        job.categoryIds.some((id) =>
          filters.categories.includes(id.toString())
        );

      const matchesJobType =
        filters.jobTypes.length === 0 || filters.jobTypes.includes(job.jobType);

      return matchesCategory && matchesJobType;
    });

    setDisplayJobs(filteredJobs);
  }, [filters, initialJobs]);

  // console.log("initialJobs", initialJobs);

  return (
    <div className="job-list-main">
      <div className="job-list-container">
        <Filters
          categories={categoryList} // Use the predefined `categories` from JobData
          jobTypes={jobTypes} // Pass extracted job types dynamically
          selectedFilters={filters}
          onFilterChange={handleFilterChange}
        />
        <div className="job-list-wrapper">
          <div className="job-list">
            {displayJobs.length > 0 ? (
              displayJobs.map((job) => <JobCard key={job.id} job={job} />)
            ) : (
              <p></p>
            )}
          </div>
          {/* 👇 Pagination is placed here, right after the list */}
          {totalPages > 1 && (
            <div className="pagination" style={{ zIndex: "1000" }}>
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
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobList;
