import React from 'react'
import { useState, useEffect } from 'react';
import Navbar from './Navbar/Navbar'
import WomanCard from './Card/WomanCard';
import './Home.css'
import Jobs from './Jobs/Jobs';
import Footer from './Footer/Footer';
import SectionWithVideoSlider from './SectionWithVideoSlider/SectionWithVideoSlider';
import Contact from './Contact/Contact';
const Home = () => {
    const images = [
        '/slideshow1.png',
        '/slideshow2.png',
        '/slideshow3.png',
        '/slideshow4.png'
      ];
    
      // State to manage current image index
      const [currentIndex, setCurrentIndex] = useState(0);
    
      // Function to increment index and loop back to start
      const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      };
    
      // Automatically change slide every 5 seconds
      useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
      }, []);
      const handleDotClick = (index) => {
        setCurrentIndex(index);
      };
      const heroTextClass = currentIndex >= 2 ? 'hero-text-colored' : 'hero-text';
  return (
      <>
        <div className='Hero'>
        <Navbar/>
        <div className='slideshow'>
          
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className={index === currentIndex ? 'active' : 'inactive'}
            />
          ))}
          <div className='dots-navigation'>
            {images.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentIndex ? 'active-dot' : ''}`}
                onClick={() => handleDotClick(index)}
              ></span>
            ))}
          </div>
        </div>
        <div className={heroTextClass}>
            <p>Find Best Jobs at any location</p>
            <h1 className='hero-large-text'>Discover <span className='lightweight-text-hero'>Best Jobs For</span> Career Growth</h1>
            <button className='hero-btn'>READ MORE</button>
        </div>
        </div>
        <div className="search-box">
          <div className='section'>
          <p>Keywords</p>
      <input
        type="text"
        placeholder="Enter job title"
        className="search-input"
        />
      </div>
      <div className='section'>
      <p>Location</p>
      <select className="search-select">
        <option value="">Select your preferred location</option>
        <option value="location1">Location 1</option>
        <option value="location2">Location 2</option>
        <option value="location3">Location 3</option>
      </select>
      </div>
      <div className='section'>
      <p>Area of Expertise</p>
      <select className="search-select">
        <option value="">Select your area of expertise</option>
        <option value="expertise1">Expertise 1</option>
        <option value="expertise2">Expertise 2</option>
        <option value="expertise3">Expertise 3</option>
      </select>
      </div>
      
      <button className="search-button">GO</button>
    </div>
        <WomanCard/>
        <Jobs/>
        <SectionWithVideoSlider/>
        <Contact/>
        <Footer/>
    </>
  )
}

export default Home