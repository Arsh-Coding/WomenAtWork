import React from 'react'
import './Navbar.css'
const Navbar = () => {
  return (
    <>
     <div className='navbar'>
        <div className='logo'>
            <img src="./logo.png" alt="" />
        </div>
        <div className='navLinks'>
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
     </div>
    </>
  )
}

export default Navbar