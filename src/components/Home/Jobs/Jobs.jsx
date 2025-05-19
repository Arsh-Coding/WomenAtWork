import React, { useState, useEffect } from "react";
import "./Jobs.css";

const Jobs = () => {
  const [activeTab, setActiveTab] = useState("Professions");
  const [displayCategories, setDisplayCategories] = useState([]);

  const tabs = [
    "Professions",
    "Recommended For You",
    "Featured Jobs",
    "Locations",
  ];

  const tabToCategories = {
    Professions: [
      { title: "Engineer", image: "./job3.png" },
      { title: "Analyst", image: "./job1.png" },
      { title: "Project Manager", image: "./job5.png" },
      { title: "Operations", image: "./job4.png" },
    ],
    "Recommended For You": [
      { title: "Mobile Developer", image: "./job7.png" },
      { title: "Customer Service", image: "./job6.png" },
      { title: "Finance", image: "./job8.png" },
      { title: "Legal Advisor", image: "./job2.png" },
    ],
    "Featured Jobs": [
      { title: "UI/UX Designer", image: "./job1.png" },
      { title: "DevOps Engineer", image: "./job4.png" },
      { title: "Sales Manager", image: "./job3.png" },
      { title: "Content Writer", image: "./job8.png" },
    ],
    Locations: [
      { title: "Delhi Jobs", image: "./job5.png" },
      { title: "Mumbai Jobs", image: "./job7.png" },
      { title: "Remote Roles", image: "./job6.png" },
      { title: "Bangalore Jobs", image: "./job2.png" },
    ],
  };

  // Shuffle function
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Handle tab switch
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    const selectedCategories = tabToCategories[tab] || [];
    const shuffled = shuffleArray(selectedCategories);
    setDisplayCategories(shuffled);
  };

  // Load initial tab
  useEffect(() => {
    handleTabClick(activeTab);
  }, []);

  return (
    <div className="jobApp">
      <h1 className="home-job-header">Browse Jobs By</h1>

      {/* Tabs */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Job Categories */}
      <div className="categories-grid">
        {displayCategories.map((category, index) => (
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
