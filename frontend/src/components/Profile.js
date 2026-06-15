import React, { useState, useEffect } from "react";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    phone: "",
    email: "",
    country_code: ""
  });
  const [isEditing, setIsEditing] = useState(false);

// Fetch profile
useEffect(() => {
  fetch("http://localhost:5000/api/auth/profile", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  })
    .then(res => res.json())
    .then(data => setUser(data))
    .catch(err => console.error("Error fetching profile:", err));
}, []);

// Save profile
const handleSave = () => {
  fetch("http://localhost:5000/api/auth/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then(() => {
      alert("Profile updated successfully!");
      setIsEditing(false);
    })
    .catch(err => console.error("Error updating profile:", err));
};


  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>

      {!isEditing ? (
        <div className="profile-details">
          <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Phone:</strong> {user.country_code} {user.phone}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      ) : (
        <div className="profile-form">
          <label>First Name:</label>
          <input name="first_name" value={user.first_name} onChange={handleChange} />

          <label>Last Name:</label>
          <input name="last_name" value={user.last_name} onChange={handleChange} />

          <label>Gender:</label>
          <input name="gender" value={user.gender} onChange={handleChange} />

          <label>Country Code:</label>
          <input name="country_code" value={user.country_code} onChange={handleChange} />

          <label>Phone:</label>
          <input name="phone" value={user.phone} onChange={handleChange} />

          <label>Email:</label>
          <input name="email" value={user.email} onChange={handleChange} />

          <button onClick={handleSave}>Save Changes</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
