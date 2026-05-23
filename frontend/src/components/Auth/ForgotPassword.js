/* ============================================
   GAMING GARAGE — Forgot Password Page (Connected to Backend)
   ============================================ */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Reset request failed. Please check your email.");
        return;
      }

      alert(data.message);
    } catch (err) {
      alert("Unable to connect to server. Please try again later.");
      console.error(err);
    }
  };

  return (
    <div
      className="auth-container"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="auth-form">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate("/")}
        >
          ← Back to Login / Signup
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
