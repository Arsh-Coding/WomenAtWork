import React from "react";
import Contact from "./Contact";
import "./mainContact.css";
import Footer from "../Footer/Footer";
const MainContact = () => {
  return (
    <div className="main-contact-container">
      <div className="contact-hero">
        <div className="text-contact">
          <h2 className="contact-hero-heading">Contact Us</h2>
          <p>
            If you would like to make an inquiry, please use the form Below and
            our team will get back to you within one business day.
          </p>
        </div>
      </div>
      <div className="middle-contact-text">
        <h2>Lorem Ipsum is simply dummy text of the printing and</h2>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old.
        </p>
      </div>
      <Contact />
      <Footer />
    </div>
  );
};

export default MainContact;
