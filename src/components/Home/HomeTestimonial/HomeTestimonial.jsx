import React from "react";
import { Link } from "react-router-dom";
import "./HomeTestimonialsSection.css";

const companies = [
  { src: "/logos/zee5.png", alt: "Zee5" },
  { src: "/logos/tellius.png", alt: "Tellius" },
  { src: "/logos/wipro.png", alt: "Wipro" },
  { src: "/logos/accenture.png", alt: "Accenture" },
  { src: "/logos/tieto.png", alt: "Tieto" },
  { src: "/logos/getty.png", alt: "Getty Images" },
  { src: "/logos/tredence.png", alt: "Tredence" },
  { src: "/logos/bt.png", alt: "BT" },
  { src: "/logos/zs.png", alt: "Zensar" },
  { src: "/logos/tiger.png", alt: "Tiger Analytics" },
  { src: "/logos/mahindra.png", alt: "Tech Mahindra" },
];

const HomeTestimonial = () => {
  return (
    <>
      <h3 className="home-testimonial-heading">
        Some Of The Organisations That Work With Us
      </h3>
      <div className="section-container-home-testimonials">
        <div className="logos-column">
          <div className="logo-grid">
            {companies.map((company, index) => (
              <img
                key={index}
                src={company.src}
                alt={company.alt}
                className="company-logo"
              />
            ))}
          </div>
          <Link to="/testimonials">
            <button className="see-all-btn">SEE ALL CLIENTS</button>
          </Link>
        </div>

        <div className="home-testimonial-card">
          <h2>TESTIMONIALS</h2>
          <hr />
          <p>
            What Sets <strong>Women In Workforce</strong> Apart Is Their
            Dedication To Supporting And Empowering Women Professionals.
          </p>
          <p>
            The Platform's Emphasis On Mentorship, Career Growth, And Providing
            Valuable Resources Such As Podcasts And Webinars Is Truly
            Commendable. It Creates A Holistic Ecosystem That Fosters
            Professional Development And Ensures That Women Thrive In Their
            Chosen Fields.
          </p>
          <hr className="home-author-divider" />
          <p className="home-testimonial-author">
            -- John Doe <br />
            <span>(Web Developer)</span>
          </p>
          <Link to="/testimonials">
            <button className="see-all-btn light">SEE ALL</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomeTestimonial;
