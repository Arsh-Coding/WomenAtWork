import React from "react";
import "./SectionWithVideoSlider.css";
import VideoSlider from "./VideoSlider";

const SectionWithVideoSlider = () => {
  return (
    <>
    <h2 className="impowerment-title">About WomenInForcement</h2>
    <div className="section-container">
      <div className="text-container">
        <p>
          Welcome to Women In Workforce, the premier platform dedicated to empowering 
          and promoting women in the workplace. Our platform is designed to connect 
          talented and ambitious women with diverse employment opportunities across 
          the United Kingdom, Europe, and India.
        </p>
        <p>
          At Women In Workforce, we understand the unique challenges and opportunities 
          that women face in their professional lives. Our mission is to bridge the 
          gender gap in various industries by providing a supportive and inclusive 
          space for women to thrive. Whether you are a recent graduate, a mid-career 
          professional, or a seasoned expert, we are here to assist you in advancing 
          your career and reaching new heights.
        </p>
        <button className="more-about-button">More About Us</button>
      </div>
      <div className="slider-container">
        <VideoSlider />
      </div>
    </div>
    </>
  );
};

export default SectionWithVideoSlider;
