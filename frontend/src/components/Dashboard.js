import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard({ searchTerm = "" }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching services:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading services...</h2>;

  // ✅ Filter services based on searchTerm
  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <h1>User Dashboard</h1>
      <p>Welcome! Here you’ll see your services and orders.</p>

      <div className="service-list">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <div
              key={service.id}
              className="service-card"
              onClick={() => navigate(`/service/${service.id}`)} // ✅ navigate to ServiceDetail
            >
              <img
                src={service.image_url}
                alt={service.title}
                className="service-image"
              />
              <h2>{service.title}</h2>
              <p>Category: {service.category}</p>
              {/* ✅ Removed Add to Cart and Order Now buttons */}
            </div>
          ))
        ) : (
          <p>No services found for "{searchTerm}"</p>
        )}
      </div>
    </div>
  );
}
