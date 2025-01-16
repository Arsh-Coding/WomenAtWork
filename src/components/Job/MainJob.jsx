import React from 'react'
import './MainJob.css'
import Navbar from '../Home/Navbar/Navbar'
import Footer from '../Home/Footer/Footer'

const MainJob = () => {
  return (
    <>
        <div className='job-container'>
          <div className='job-Heading'>
            <h1>Find Your Dream Job Now</h1>
            <p>5 Lakh+ jobs for you to explore</p>
          </div>
        <div className="job-search-box">
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
    </div>
    <Footer/>
    </>
  )
}

export default MainJob;