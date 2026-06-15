import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ServiceDetail.css";

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [activeTab, setActiveTab] = useState("details");

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    fetch(`http://localhost:5000/api/services/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setService(data.service);
        setOptions(data.options || []);
        if (data.options && data.options.length > 0) {
          const defaultOpt =
            data.options.find((o) =>
              o.option_name.toLowerCase().includes("both"),
            )?.option_name || data.options[0].option_name;
          setSelectedOption(defaultOpt);
        }
      })
      .catch((err) => console.error("Error fetching service:", err));
  }, [id]);

  if (!service) return <h2>Loading service...</h2>;

  const currentPrice =
    options.find((o) => o.option_name === selectedOption)?.price ||
    service.price;

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add items to cart.");
      return;
    }

    fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        service_id: service.id,
        option_name: selectedOption, // ✅ send the chosen option
        quantity: 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Added to cart!");
        console.log("Cart item saved:", data);
      })
      .catch((err) => console.error("Error adding to cart:", err));
  };

  const handleOrderNow = () => {
    if (!isLoggedIn) {
      alert("Please login to proceed with payment.");
    } else {
      // ✅ Instead of placing order directly, go to cart
      navigate("/cart");
    }
  };

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
        <strong>₹{currentPrice}</strong>
      </p>
      <p>Category: {service.category}</p>

      {options.length > 0 && (
        <div className="stick-options">
          {options.map((opt) => (
            <label key={opt.id}>
              <input
                type="radio"
                name="option"
                value={opt.option_name}
                checked={selectedOption === opt.option_name}
                onChange={() => setSelectedOption(opt.option_name)}
              />
              {opt.option_name} (₹{opt.price})
            </label>
          ))}
        </div>
      )}

      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={handleOrderNow}>Order Now</button>

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
