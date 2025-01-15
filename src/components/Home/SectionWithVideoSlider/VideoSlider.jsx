import React, { useState } from "react";
import "./VideoSlider.css";

const VideoSlider = () => {
  // Array of video objects with a thumbnail and video source
  const videos = [
    { id: 1, thumbnail: "/assets/group7.png", src: "" },
    { id: 2, thumbnail: "/assets/group8.png", src: "" },
    { id: 3, thumbnail: "/assets/group9.png", src: "" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle dot navigation
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="video-slider">
      <div className="slider-wrapper">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={`slide ${index === currentIndex ? "active" : ""}`}
          >
            <img
              src={video.thumbnail}
              alt={`Thumbnail ${video.id}`}
              className="thumbnail"
            />
            {index === currentIndex && (
              <button className="play-button">
                <i className="play-icon">&#9658;</i>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Dots for navigation */}
      <div className="dots">
        {videos.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default VideoSlider;
