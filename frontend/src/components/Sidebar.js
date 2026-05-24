import React from "react";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li><a href="/dashboard">🏠 Home</a></li>
        <li><a href="/services">🛠 Services</a></li>
        <li><a href="/orders">📦 Orders</a></li>
        <li><a href="/profile">👤 Profile</a></li>
      </ul>
    </aside>
  );
}
