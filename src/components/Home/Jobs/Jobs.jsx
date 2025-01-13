import React, { useState } from "react";
import "./Jobs.css";

const Jobs = () => {
  const [activeTab, setActiveTab] = useState("Professions");

  const tabs = ["Professions", "Recommended For You", "Featured Jobs", "Locations"];
  const categories = [
    { title: "Analyst", image: "./job1.png" },
    { title: "Finance & Legal", image: "./job2.png" },
    { title: "Mobile Development", image: "./job7.png" },
    { title: "Operations", image: "./job4.png" },
    { title: "Project Management", image: "./job5.png" },
    { title: "Customer Service", image: "./job6.png" },
    { title: "Engineer", image: "./job3.png" },
    { title: "Finance", image: "./job8.png" },
  ];

  return (
    <div className="jobApp">
      <h1 className="header">Browse Jobs By</h1>

      {/* Tabs */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Job Categories */}
      <div className="categories-grid">
        {categories.map((category, index) => (
          <div className="category-card" key={index}>
            <img
              src={category.image}
              alt={category.title}
              className="category-image"
            />
            <div className="category-overlay">
              <h3 className="category-title">{category.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
