/* ============================================
   GAMING GARAGE — Reset Password Page (Connected to Backend)
   ============================================ */
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Auth.css";
import bgImage from "../../assets/background.jpg";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== rePassword) {
      toast.error("Passwords do not match ❌");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, newPassword }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Reset failed. Please check your email ❌");
        return;
      }

      toast.success(data.message || "Password updated successfully ✅");
      setTimeout(() => navigate("/login"), 300);
    } catch (err) {
      console.error("Error:", err);
      toast.error("Unable to connect to server ❌");
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
          objectFit: "cover", // ✅ corrected for full background
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
