/* ============================================
   GAMING GARAGE — Forgot Password Page (Connected to Backend)
   ============================================ */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import bgImage from "../../assets/background.jpg";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

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
    <div className="auth-container">
      <img
        src={bgImage}
        alt="background"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "fit", // ✅ works here
          zIndex: -1,
        }}
      />
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
        <div className="back">
          <button
            type="button"
            className="back-link"
            onClick={() => navigate("/login")}
          >
            ← Back to Login / Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
