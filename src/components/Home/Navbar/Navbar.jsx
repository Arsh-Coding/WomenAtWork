import React, { useState } from 'react';
import './Navbar.css';
import { Link } from "react-router-dom";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className='navbar'>
        <div className='logo'>
          <img src='./logo.png' alt='Logo' />
        </div>
        <div className={`navLinks ${menuOpen ? 'active' : ''}`}>
          <div className='Links'>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li>About</li>
              <li><Link to="/JobPage">Jobs</Link></li>
              <li>WOW</li>
              <li>Contact</li>
            </ul>
          </div>
          <button>SignIn/Register</button>
        </div>
        <div className='hamburger' onClick={toggleMenu}>
          &#9776; {/* Hamburger Icon */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
