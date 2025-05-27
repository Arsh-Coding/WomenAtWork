import React, { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import "./Contact.css";
import { apiEndpoint } from "../../../services/urls";
const Contact = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    subject: "",
    message: "",
  });
  const toast = useRef(null);
  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiEndpoint}contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: result.message,
          life: 3000,
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: result.error || "Something went wrong",
          life: 3000,
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Server error, please try again later.");
    }
  };

  return (
    <div className="contacts">
      <Toast ref={toast} />
      <div className="contact-section1">
        <div className="contact-heading">
          <h3>Contact us On</h3>
          <h2>+91 9988998898</h2>
          <p>
            If you want to make an inquiry, please use the form below and our
            team will get back to yu within one business day
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-name">
            <input
              type="text"
              placeholder="Your First Name *"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Your Last Name *"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="contact-name">
            <input
              type="email"
              placeholder="Your email*"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Subject *"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="contact-name">
            <input
              type="text"
              placeholder="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="contact-btn">
            Send
          </button>
        </form>
      </div>

      <div className="section2">
        <div className="rectangle">
          <div className="contact-item">
            <div className="icon">
              <img src="/enquiries icon.png" alt="" />
            </div>
            <div>
              <h3>Enquiries</h3>
              <p>womeninworkforce.com</p>
            </div>
          </div>
          <div className="contact-item">
            <div className="icon">
              <img src="/nav icon.png" alt="" />
            </div>
            <div>
              <h3>Office Location</h3>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
          </div>
          <div className="contact-item">
            <div className="icon">
              <img src="/call icon.png" alt="" />
            </div>
            <div>
              <h3>Phone</h3>
              <p>+91 9899899898</p>
            </div>
          </div>
          <div className="contact-icons">
            <p>Follow Us:</p>
            <img src="/facebook.png" alt="" />
            <img src="x.png" alt="" />
            <img src="linkedin.png" alt="" />
            <img src="instagram.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
