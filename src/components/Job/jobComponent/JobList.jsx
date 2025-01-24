import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import Filters from "./Filters";
import "../jobStyles/JobList.css";
import { jobData, categories as categoryList } from "../JobData/JobData";

const JobList = ({ initialJobs }) => {
  const [filters, setFilters] = useState({
    categories: [],
    jobTypes: [],
  });

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

  return (
    <div className="job-list-main">
      <div className="job-list-container">
        <Filters
          categories={categoryList} // Use the predefined `categories` from JobData
          jobTypes={jobTypes} // Pass extracted job types dynamically
          selectedFilters={filters}
          onFilterChange={handleFilterChange}
        />
        <div className="job-list">
          {displayJobs.length > 0 ? (
            displayJobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <p>No jobs found matching your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobList;
