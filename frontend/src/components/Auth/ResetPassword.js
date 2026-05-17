/* ============================================
   GAMING GARAGE — Reset Password Page (Final Version)
   ============================================ */
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Auth.css";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Reset failed. Please check your email.");
        return;
      }

      const data = await response.json();
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
        <h2>Set New Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Re-type New Password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            required
          />
          <button type="submit">Update Password</button>
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

export default ResetPassword;
