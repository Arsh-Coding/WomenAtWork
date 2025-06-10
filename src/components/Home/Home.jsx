import React from "react";
import { useState, useEffect } from "react";
// import Navbar from './Navbar/Navbar';
import WomanCard from "./Card/WomanCard";
import { Link } from "react-router-dom";
import "./Home.css";
import Jobs from "./Jobs/Jobs";
import Footer from "./Footer/Footer";
import SectionWithVideoSlider from "./SectionWithVideoSlider/SectionWithVideoSlider";
import HomeTestimonial from "./HomeTestimonial/homeTestimonial";
import Contact from "./Contact/Contact";
import JobFilter from "../JobFilter/JobFilter";

const Home = () => {
  const images = [
    "/slideshow1.png",
    "/slideshow2.png",
    "/slideshow3.png",
    "/slideshow4.png",
  ];

  const [filters, setFilter] = useState({
    keyword: "",
    location: "",
    categoryId: "",
  });
  // State to manage current image index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to increment index and loop back to start
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Automatically change slide every 5 seconds.
  useEffect(() => {
    // throw new Error("Something went wrong in the home page");
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);
  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };
  const heroTextClass = currentIndex >= 2 ? "hero-text-colored" : "hero-text";
  return (
    <>
      {/* <Navbar/> */}

      <div className="Hero">
        <div className="slideshow">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className={index === currentIndex ? "active" : "inactive"}
            />
          ))}
          <div className="dots-navigation">
            {images.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentIndex ? "active-dot" : ""}`}
                onClick={() => handleDotClick(index)}
              ></span>
            ))}
          </div>
        </div>
        <div className={heroTextClass}>
          <p>Find Best Jobs at any location</p>
          <h1 className="hero-large-text">
            Discover{" "}
            <span className="lightweight-text-hero">Best Jobs For</span> Career
            Growth
          </h1>
          <Link to="/testimonials">
            <button className="hero-btn">READ MORE</button>
          </Link>
        </div>
      </div>
      <div className="job-filter-home">
        <JobFilter initialFilters={filters} />
      </div>
      <WomanCard />
      <Jobs />
      <SectionWithVideoSlider />
      <HomeTestimonial />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
