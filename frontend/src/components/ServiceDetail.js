import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ServiceDetail.css";

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    fetch(`http://localhost:5000/api/services/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data))
      .catch((err) => console.error("Error fetching service:", err));
  }, [id]);

  if (!service) return <h2>Loading service...</h2>;

  return (
    <div className="service-detail-container">
      <button className="back-button" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>

      <img
        src={service.image_url}
        alt={service.title}
        className="service-image"
      />

      <h1>{service.title}</h1>
      <p>
        <strong>₹{service.price}</strong>
      </p>
      <p>Category: {service.category}</p>

      <button>Add to Cart</button>
      <button
        onClick={() => {
          if (!isLoggedIn) {
            alert("Please login to proceed with payment.");
          } else {
            alert("Proceeding to payment...");
          }
        }}
      >
        Order Now
      </button>

      {/* Bottom nav tabs */}
      <div className="tabs">
        <button onClick={() => setActiveTab("details")}>Details</button>
        <button onClick={() => setActiveTab("reviews")}>Reviews</button>
        <button onClick={() => setActiveTab("shipping")}>Shipping</button>
        <button onClick={() => setActiveTab("warranty")}>
          Repair Warranty
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "details" && <p>{service.description}</p>}
        {activeTab === "reviews" && <p>⭐ Reviews will go here.</p>}
        {activeTab === "shipping" && <p>🚚 Free delivery across India.</p>}
        {activeTab === "warranty" && (
          <p>🛠 3-month repair warranty included.</p>
        )}
      </div>
    </div>
  );
}
