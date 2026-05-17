import React, { useState } from "react";
import "./Auth.css";

const LoginSignup = () => {
  const [tab, setTab] = useState("login");

  return (
    <div
      className="auth-container"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="auth-form">
        {/* Removed extra Gaming Garage logo here */}
        <h2>Gaming Garage</h2>

        <div className="tabs">
          <button
            className={tab === "login" ? "active" : ""}
            onClick={() => setTab("login")}
          >
            Login
          </button>
          <button
            className={tab === "signup" ? "active" : ""}
            onClick={() => setTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {tab === "login" ? (
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
            <div className="forgot">
              <a href="#">Forgot Password?</a>
            </div>
          </form>
        ) : (
          <form>
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Re-type Password" />
            <input type="text" placeholder="Contact" />
            <select>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
