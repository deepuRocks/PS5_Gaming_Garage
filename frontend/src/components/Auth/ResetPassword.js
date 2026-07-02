/* ============================================
   GAMING GARAGE — Reset Password Page (Connected to Backend)
   ============================================ */
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Auth.css";
import bgImage from "../../assets/background.jpg";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== rePassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Reset failed. Please check your email.");
        return;
      }

      alert(data.message);
      navigate("/"); // redirect back to login/signup
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

export default ResetPassword;
