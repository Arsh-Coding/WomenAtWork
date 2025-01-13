import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Columns */}
        <div className="footer-column">
          <h4>Important Pages</h4>
          <ul>
            <li>News & Views</li>
            <li>Accessibility</li>
            <li>Diversity</li>
            <li>Feedback</li>
            <li>Help</li>
            <li>Modern Slavery Act Statement</li>
            <li>Privacy notice</li>
            <li>Site map</li>
            <li>User agreement</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>For Candidates</h4>
          <ul>
            <li>Sign In/Register</li>
            <li>Submit your Timesheet</li>
            <li>Career Tools</li>
            <li>Candidate Services</li>
            <li>Job Alerts</li>
            <li>Quick Upload CV</li>
            <li>Our Featured Clients</li>
            <li>Refer a Friend</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>For Clients</h4>
          <ul>
            <li>Managed Services</li>
            <li>Executive Search</li>
            <li>RPO</li>
            <li>Talent Bank Solutions</li>
            <li>Talent Room</li>
            <li>Client Testimonials</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Professions We Recruit For</h4>
          <div className=""></div>
          <ul>
            <li>Admin & Customer Service</li>
            <li>Catering, Cleaning & Logistics</li>
            <li>Charity & Fundraising</li>
            <li>Construction, Property & Engineering</li>
            </ul>
            <ul>
            <li>Education</li>
            <li>Finance, Procurement & Legal</li>
            <li>Housing, Revenues & Benefits</li>
            <li>HR, Marketing & Sales</li>
            <li>Leadership</li>
            <li>Policy & Public Affairs</li>
            <li>Social Care & Health</li>
            <li>Technology</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Contact Us</h4>
          <ul>
            <li>London</li>
            <li>Milton Keynes</li>
            <li>Glasgow</li>
            <li>Manchester</li>
            <li>Birmingham</li>
          </ul>
          <div className="social-icons">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-linkedin-in"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>©2023 WomeninEnforcement. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
