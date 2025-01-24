import React from "react";
import "../jobStyles/Filters.css";

const Filters = ({
  categories = [],
  jobTypes = [],
  selectedFilters,
  onFilterChange,
}) => {
  return (
    <div className="filters-container">
      <div className="filter-section">
        <h3>Category</h3>
        <ul className="filter-list">
          {categories.map((category) => (
            <li key={category.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.categories.includes(
                    category.id.toString()
                  )}
                  onChange={() =>
                    onFilterChange("categories", category.id.toString())
                  }
                />
                {category.name}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-section">
        <h3>Job Type</h3>
        <ul className="filter-list">
          {jobTypes.map((type) => (
            <li key={type}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFilters.jobTypes.includes(type)}
                  onChange={() => onFilterChange("jobTypes", type)}
                />
                {type}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Filters;
