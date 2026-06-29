import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css"; // ✅ ensure this is imported

export default function Checkout() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login to place an order.");
      return;
    }

    fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to place order");
        return res.json();
      })
      .then((data) => {
        alert("Order placed successfully!");
        navigate("/orders");
      })
      .catch((err) => console.error("Error placing order:", err));
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit} className="checkout-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">Address:</label>
        <textarea
          name="address"
          required
          value={formData.address}
          onChange={handleChange}
          className="form-input"
          placeholder="Enter full address including pincode"
        />

        <button type="submit" className="btn-place-order">
          Place Order
        </button>
      </form>
    </div>
  );
}
