import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address1: "",
    address2: "",
    landmark: "",
    pincode: "",
    state: "",
  });

  const token = localStorage.getItem("token");

  const states = [
    "Telangana",
    "Andhra Pradesh",
    "Karnataka",
    "Tamil Nadu",
    "Maharashtra",
    "Kerala",
    "Delhi",
    "Other",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login to place an order.");
      return;
    }

    // Mandatory validation
    if (
      !formData.name ||
      !formData.phone ||
      !formData.address1 ||
      !formData.landmark ||
      !formData.pincode ||
      !formData.state
    ) {
      alert("Please fill all mandatory fields.");
      return;
    }

    // Phone validation
    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    // Pincode validation
    if (!/^\d{6}$/.test(formData.pincode)) {
      alert("Pincode must be exactly 6 digits.");
      return;
    }

    // Send structured fields to backend
    fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        address1: formData.address1,
        address2: formData.address2,
        landmark: formData.landmark,
        pincode: formData.pincode,
        state: formData.state,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to place order");
        return res.json();
      })
      .then(() => {
        alert("Order placed successfully!");
        navigate("/orders");
      })
      .catch((err) => console.error("Error placing order:", err));
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit} className="checkout-form">

        <div className="form-group">
          <label htmlFor="name">
            Name<span className="required">*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">
            Phone<span className="required">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
            maxLength="10"
            placeholder="Enter 10-digit phone number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address1">
            Address 1<span className="required">*</span>
          </label>
          <input
            id="address1"
            type="text"
            name="address1"
            placeholder="Building name, floor, door number"
            required
            value={formData.address1}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address2">Address 2</label>
          <input
            id="address2"
            type="text"
            name="address2"
            placeholder="Street name, area, city, state"
            value={formData.address2}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="landmark">
            Landmark<span className="required">*</span>
          </label>
          <input
            id="landmark"
            type="text"
            name="landmark"
            required
            value={formData.landmark}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="pincode">
            Pincode<span className="required">*</span>
          </label>
          <input
            id="pincode"
            type="text"
            name="pincode"
            required
            value={formData.pincode}
            onChange={handleChange}
            pattern="[0-9]{6}"
            maxLength="6"
            placeholder="Enter 6-digit pincode"
          />
        </div>

        <div className="form-group">
          <label htmlFor="state">
            State<span className="required">*</span>
          </label>
          <select
            id="state"
            name="state"
            required
            value={formData.state}
            onChange={handleChange}
          >
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-place-order">
          Place Order
        </button>
      </form>
    </div>
  );
}
