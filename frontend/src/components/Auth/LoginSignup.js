/* ============================================
   GAMING GARAGE — Auth Component (Connected to Backend)
   ============================================ */

import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";
import bgImage from "../../assets/background.jpg";
const LoginSignup = () => {
  const [tab, setTab] = useState("login");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tab === "signup") {
      const firstName = e.target[0].value;
      const lastName = e.target[1].value;
      const email = e.target[2].value;
      const password = e.target[3].value;
      const rePassword = e.target[4].value;
      const countryCode = e.target[5].value;
      const phoneNumber = e.target[6].value;
      const gender = e.target[7].value;

      // ✅ Validations
      if (!email.includes("@")) {
        alert("Email must contain '@'");
        return;
      }
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&.]{8,}$/;
      if (!passwordRegex.test(password)) {
        alert("Password must be at least 8 characters, alphanumeric, and may include special characters");
        return;
      }
      if (password !== rePassword) {
        alert("Passwords do not match");
        return;
      }
      const phoneRegex = /^\d{10}$/;
      if (!countryCode.startsWith("+")) {
        alert("Country code must start with '+' (e.g. +91, +1)");
        return;
      }
      if (!phoneRegex.test(phoneNumber)) {
        alert("Phone number must be exactly 10 digits");
        return;
      }
      if (!gender) {
        alert("Please select a gender");
        return;
      }

      // ✅ Call backend signup API with all fields
      try {
        const res = await axios.post("http://localhost:5000/api/auth/signup", {
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
          countryCode,
          gender,
        });
        alert(res.data.message);
        setTab("login"); // ✅ redirect user to login form
      } catch (err) {
        alert(err.response?.data?.message || "Signup failed");
      }
    } else {
      const email = e.target[0].value;
      const password = e.target[1].value;

      if (!email.includes("@")) {
        alert("Email must contain '@'");
        return;
      }
      if (password.length < 8) {
        alert("Password must be at least 8 characters");
        return;
      }

      // ✅ Call backend login API
      try {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email,
          password,
        });

        if (res.data.role === "admin") {
          alert("Admin login successful");
          window.location.href = "/admin";
        } else if (res.data.role === "user") {
          alert("User login successful");
          window.location.href = "/dashboard";
        } else {
          alert(res.data.message);
        }
      } catch (err) {
        alert(err.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <div className="auth-container">
      <img src={bgImage} alt="Background" className="bg-image" />

      <div className="auth-form">
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
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
            <div className="forgot">
              <button
                type="button"
                className="forgot-link"
                onClick={() => (window.location.href = "/forgot-password")}
              >
                Forgot Password?
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Re-type Password" />

            <div style={{ display: "flex", gap: "8px" }}>
              <select defaultValue="+91" style={{ width: "90px" }}>
                <option value="+91">India +91</option>
                <option value="+1">USA +1</option>
                <option value="+44">UK +44</option>
                <option value="+81">Japan +81</option>
                <option value="+49">Germany +49</option>
                <option value="+33">France +33</option>
                <option value="+61">Australia +61</option>
                <option value="+86">China +86</option>
                <option value="+7">Russia +7</option>
                <option value="+39">Italy +39</option>
              </select>
              <input type="text" placeholder="Phone Number (10 digits)" />
            </div>

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