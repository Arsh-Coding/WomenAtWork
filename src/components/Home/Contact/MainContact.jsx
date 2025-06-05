import React, { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import "./mainContact.css";
import Contact from "./Contact";
import { apiEndpoint } from "../../../services/urls";
import Footer from "../Footer/Footer";

const mainContact = () => {
  const toast = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    } catch (err) {
      console.error(err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Server error",
        life: 3000,
      });
    }
  };

  return (
    <div className="main-contact-container">
      <Toast ref={toast} />

      {/* Hero Section */}
      <div className="contact-hero">
        <div className="text-contact">
          <h2 className="contact-hero-heading">Contact Us</h2>
          <p>
            If you would like to make an inquiry, please use the form below and
            our team will get back to you within one business day.
          </p>
        </div>
      </div>

      {/* Middle Description */}
      <div className="middle-contact-text">
        <h2>Lorem Ipsum is simply dummy text of the printing and</h2>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old.
        </p>
      </div>

      {/* Contact Form */}
      <Contact />
      <Footer />
    </div>
  );
};

export default mainContact;
