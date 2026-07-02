import React, { useState, useEffect } from "react";
import "../styles/Reviews.css";
import reviewsData from "../data/reviews.json";
import { FaStar, FaMapMarkerAlt, FaUserCircle, FaArrowUp } from "react-icons/fa";

export default function Reviews() {
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
  return (
    <div className="reviews-container">
      <h2>
        <FaMapMarkerAlt className="icon-location" /> Customer Reviews
      </h2>
      <h3>See what people are saying about Hyderabad Gaming Garage..☺️</h3>

      {/* Map Embed */}
      <div className="map-wrapper">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5203.156752800323!2d78.3312023751669!3d17.47227318342946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb932a9f418d49%3A0x50101aecae3d3488!2sHyderabad%20Gaming%20Garage!5e1!3m2!1sen!2sin!4v1782997489839!5m2!1sen!2sin"
          width="600"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Hyderabad Gaming Garage Location"
        ></iframe>
      </div>

      {/* Reviews List */}
      <div className="reviews-list">
        {reviewsData.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-header">
              <FaUserCircle className="icon-user" />
              <span className="review-author">{review.name}</span>
            </div>
            <div className="review-rating">
              {[...Array(review.stars)].map((_, i) => (
                <FaStar key={i} className="icon-star" />
              ))}
            </div>
            {/* Only show text if available */}
            {review.text && (
              <p className="review-text">{review.text}</p>
            )}
            {review.publishAt && (
              <p className="review-date">{review.publishAt}</p>
            )}
          </div>
        ))}
      </div>
            {/* Scroll to Top Button */}
      {showButton && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}
