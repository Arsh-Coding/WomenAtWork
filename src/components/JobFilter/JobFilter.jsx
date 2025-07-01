import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { httpGet } from "../../services/api";
import { URLS } from "../../services/urls";
import Select from "react-select";
import { useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
// import "./JobFilter.css";

const JobFilter = ({ initialFilters }) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState(
    initialFilters || {
      keyword: "",
      location: "",
      categoryId: "",
    }
  );

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  // console.log("Filters from JobFilter:", location.state);
  useEffect(() => {
    setFilters(initialFilters || { keyword: "", location: "", categoryId: "" });
  }, [initialFilters]);
  const location = useLocation();

  useEffect(() => {
    const routeFilters = location?.state || {};
    setFilters({
      keyword: routeFilters.keyword || "",
      location: routeFilters.location || [],
      categoryId: routeFilters.categoryId || "",
    });
  }, [location?.state]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryResponse, jobResponse] = await Promise.all([
          httpGet(URLS.categories),
          httpGet(URLS.alljobs),
        ]);
        // console.log(categoryResponse, "and ", jobResponse.jobs);
        setCategories(categoryResponse);
        const uniqueLocations = [
          ...new Set(jobResponse?.jobs.map((job) => job.location)),
        ];
        setLocations(
          uniqueLocations.map((loc) => ({ label: loc, value: loc }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleLocationChange = (selectedOptions) => {
    const values = selectedOptions
      ? selectedOptions.map((opt) => opt.value)
      : [];
    setFilters((prevFilters) => ({
      ...prevFilters,
      location: values,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const applyFilters = () => {
    navigate("/JobPage", { state: filters });
  };

  // console.log("filters33333", filters);

  return (
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
        <Select
          isMulti
          name="location"
          options={locations}
          value={locations.filter((opt) =>
            filters.location.includes(opt.value)
          )}
          onChange={handleLocationChange}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Select or type locations"
        />
        {/* <select
          name="location"
          value={filters.location}
          onChange={handleInputChange}
          className="search-select"
        >
          <option value="">Select your preferred location</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select> */}
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
  );
};

export default JobFilter;
