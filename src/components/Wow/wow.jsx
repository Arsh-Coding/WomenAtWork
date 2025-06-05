import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./testimonial-styles.css";
import Footer from "../Home/Footer/Footer";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Web Developer",
    text: "लोरेम इप्सम एक छद्म-लैटिन पाठ है जिसका उपयोग मुद्रण और टाइपसेटिंग उद्योगों में किया जाता है। 1500 के दशक के बाद से, जब एक अज्ञात प्रिंटर ने एक प्रकार की नमूना पुस्तक बनाने के लिए एक गैली टाइप किया, लोरेम इप्सम उद्योग का मानक डमी टेक्स्ट रहा है। यह न केवल पांच शताब्दियों तक जीवित रहा है, बल्कि इलेक्ट्रॉनिक टाइपसेटिंग में भी परिवर्तन हुआ है, जो अनिवार्य रूप से अपरिवर्तित है। इसने 1960 के दशक में लोरेम इप्सम पैसेज वाले लेट्रासेट शीट्स के रिलीज के साथ लोकप्रियता हासिल की, और हाल ही में एल्डस पेजमेकर जैसे डेस्कटॉप प्रकाशन सॉफ्टवेयर के साथ, जिसमें लोरेम इप्सम संस्करण शामिल हैं।",
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
              <ChevronLeft size={24} />
            </button>

            <button
              className="nav-button next"
              onClick={nextSlide}
              style={{ color: "black" }}
            >
              <ChevronRight size={24} />
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
