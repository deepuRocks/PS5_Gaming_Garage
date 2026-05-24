import React, { useState, useEffect } from "react";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState({
    username: "",
    gender: "",
    phone: "",
    email: ""
  });

  useEffect(() => {
    // ✅ Fetch user info from backend
    fetch("http://localhost:5000/api/profile", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error("Error fetching profile:", err));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    fetch("http://localhost:5000/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => alert("Profile updated successfully!"))
      .catch(err => console.error("Error updating profile:", err));
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="profile-form">
        <label>Username:</label>
        <input name="username" value={user.username} onChange={handleChange} />

        <label>Gender:</label>
        <input name="gender" value={user.gender} onChange={handleChange} />

        <label>Phone:</label>
        <input name="phone" value={user.phone} onChange={handleChange} />

        <label>Email:</label>
        <input name="email" value={user.email} onChange={handleChange} />

        <button onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
}
