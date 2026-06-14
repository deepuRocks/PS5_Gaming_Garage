import React from "react";
import "./Sidebar.css";
import { FaHome, FaBox, FaUser } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path) => {
    navigate(path);
  };

  return (
    <div className="sidebar">
      <ul>
        <li>
          <div
            onClick={() => handleNav("/dashboard")}
            className={location.pathname === "/dashboard" ? "active" : ""}
          >
            <FaHome /> Dashboard
          </div>
        </li>
        <li>
          <div
            onClick={() => handleNav("/orders")}
            className={location.pathname === "/orders" ? "active" : ""}
          >
            <FaBox /> My Orders
          </div>
        </li>
        <li>
          <div
            onClick={() => handleNav("/profile")}
            className={location.pathname === "/profile" ? "active" : ""}
          >
            <FaUser /> Profile
          </div>
        </li>
      </ul>
    </div>
  );
}
