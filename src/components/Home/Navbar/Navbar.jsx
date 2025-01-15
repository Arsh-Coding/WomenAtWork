import React, { useState } from 'react';
import './Navbar.css';

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
              <li>Home</li>
              <li>About</li>
              <li>Jobs</li>
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
