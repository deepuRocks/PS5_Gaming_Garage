import React, { useState, useEffect } from "react";
import "../styles/ContactUs.css";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaWhatsapp,
  FaArrowUp,
} from "react-icons/fa";
import contactImage from "../assets/contact-hero.png";

export default function ContactUs() {
  const [showButton, setShowButton] = useState(false);

  // Show button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

    // Send feedback to backend
    const response = await fetch("http://localhost:5000/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Feedback sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      alert("Failed to send feedback. Please try again.");
    }
  };

  return (
    <>
      {/* ✅ Hero card section — inside wrapper with padding */}
      <div className="contact-wrapper">
        <div className="contact-container">
          {/* Left side image */}
          <div className="hero-image">
            <img src={contactImage} alt="Contact Us" />
          </div>

          {/* Right side info */}
          <div className="hero-info">
            <h1>Let's Talk!</h1>
            <p>
              We help gamers keep their consoles and controllers in top shape.
              Reach out to us for repairs, service details, or any questions.
            </p>

            <div className="info-block">
              <h2>Email</h2>
              <p>
                <FaEnvelope /> ps5gaminggarage@gmail.com
              </p>
            </div>

            <div className="info-block">
              <h2>Phone</h2>
              <p>
                <FaPhoneAlt /> +91 9810167325 (9 AM – 10 PM)
              </p>
            </div>

            <div className="info-block">
              <h2>Location</h2>
              <p>
                <FaMapMarkerAlt /> Hyderabad, Telangana – 500090
              </p>
            </div>
            {/* ✅ Social buttons */}
            <div className="social-buttons">
              <a
                href="https://www.instagram.com/hyderabad_gaming_garage?igsh=MWRuNGt5cHhlNXU1OA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn instagram-btn"
              >
                <FaInstagram /> Instagram
              </a>
              <a
                href="https://wa.me/message/EX5ELXCPQ5WRD1"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn whatsapp-btn"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Feedback Form */}
      <div className="feedback-form">
        <h2>Send Us Your Feedback</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send Feedback</button>
        </form>
      </div>

      {/* ✅ Map section — OUTSIDE wrapper, full width, flush above footer */}
      <div className="map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d237.74581472820373!2d78.36198471587669!3d17.55837461886426!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8d0062939c55%3A0xc4587a6f972a07de!2sTelangana%20Talli%20Statue!5e0!3m2!1sen!2sin!4v1783009229910!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
          title="Hyderabad Gaming Garage Location"
        ></iframe>
      </div>
      {/* Scroll to Top Button */}
      {showButton && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </>
  );
}
