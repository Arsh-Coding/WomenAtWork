import React, { useState } from "react";
// import { ChevronLeft, ChevronRight } from 'lucide-react';
import "./testimonial-styles.css";
import Footer from "../Home/Footer/Footer";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Web Developer",
    text: "I highly recommend women in workforce to any employer seeking to build a diverse and inclusive workforce. It is a game-changer for organizations committed to gender equality, and I am proud to be a part of this empowering community.",
    image: "/profilePic.jpg",
  },
  {
    id: 2,
    name: "John Doe",
    role: "Web Developer",
    text: "What sets women in workforce apart is their dedication to supporting and empowering women professionals. The platform's emphasis on mentoring, career growth, and providing valuable resources such as podcasts and webinars is truly commendable. It creates a holistic ecosystem that fosters professional development and ensures that women thrive in their chosen fields.",
    image: "/profilePic.jpg",
  },
  {
    id: 3,
    name: "John Doe",
    role: "Web Developer",
    text: "Through women in workforce, we have been able to reach a broader pool of exceptional candidates who bring diverse perspectives and valuable skills to our team. The platform's user-friendly interface and comprehensive job listings have made our hiring process more efficient and streamlined.",
    image: "/profilePic.jpg",
  },
];

const TestimonialSection = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const getSlideIndex = (offset) => {
    return (currentSlide + offset + testimonials.length) % testimonials.length;
  };

  return (
    <>
      <div className="wow-container">
        <div className="our-customers">
          <h3 className="wow-heading">Our Customers</h3>
          <img src="/logos.png" alt="Customer logos" />
        </div>

        <div className="testimonials">
          <h3 className="wow-heading">Testimonials</h3>

          <div className="testimonials-container">
            <button
              className="nav-button prev"
              onClick={prevSlide}
              style={{ color: "black" }}
            >
              Prev
            </button>

            <button
              className="nav-button next"
              onClick={nextSlide}
              style={{ color: "black" }}
            >
              Next
            </button>

            <div className="testimonials-slider">
              {[-1, 0, 1].map((offset) => {
                const index = getSlideIndex(offset);
                const isCenter = offset === 0;

                return (
                  <div
                    key={offset}
                    className={`testimonial-card ${
                      isCenter ? "center" : "side"
                    }`}
                  >
                    <div className="testimonial-content">
                      <img
                        src={testimonials[index].image}
                        alt={testimonials[index].name}
                        className="testimonial-image"
                      />
                      <p className="testimonial-text">
                        "{testimonials[index].text}"
                      </p>
                      <div className="testimonial-author">
                        <p className="testimonial-name">
                          {testimonials[index].name}
                        </p>
                        <p className="testimonial-role">
                          {testimonials[index].role}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="dots-container">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`dot ${currentSlide === index ? "active" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TestimonialSection;
