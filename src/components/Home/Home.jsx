import React from 'react'
import { useState, useEffect } from 'react';
import Navbar from './Navbar/Navbar'
import WomanCard from './Card/WomanCard';
import './Home.css'
import Jobs from './Jobs/Jobs';
import Footer from './Footer/Footer';
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
        </div>
        </div>
        <div className='searchWrap'>
            <div className='searchInput'>
                <p>Keywords</p>
                <input type="text" />
            </div>
            <div className='searchInput'>
                <p>Location</p>
                <input type="text" />
            </div>
            <div className='searchInput'>
                <p>Area Of Expertise</p>
                <input type="text" />
            </div>
            <button>Go</button>
        </div>
        <WomanCard/>
        <Jobs/>
        <Footer/>
    </>
  )
}

export default Home