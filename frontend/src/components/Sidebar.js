import React from "react";
import "./Sidebar.css";
import { FaHome, FaTools, FaBox, FaUser } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li><a href="/dashboard" className="active"><FaHome /> Dashboard</a></li>
        <li><a href="/services"><FaTools /> My Services</a></li>
        <li><a href="/orders"><FaBox /> My Orders</a></li>
        <li><a href="/profile"><FaUser /> Profile</a></li>
      </ul>
    </div>
  );
}


