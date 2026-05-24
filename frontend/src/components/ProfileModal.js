import React from "react";
import "./ProfileModal.css";

export default function ProfileModal({ user, onClose }) {
  if (!user) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>User Profile</h2>
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phoneNumber}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
