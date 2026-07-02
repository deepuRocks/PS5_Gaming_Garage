import React from "react";
import "./Sidebar.css";
import {
  FaHome,
  FaBox,
  FaUser,
  FaEnvelope,
  FaInfoCircle,
  FaStarHalfAlt, 
} from "react-icons/fa";
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
        <li>
          <div
            onClick={() => handleNav("/about")}
            className={location.pathname === "/about" ? "active" : ""}
          >
            <FaInfoCircle /> About US
          </div>
        </li>
        <li>
          <div
            onClick={() => handleNav("/contact")}
            className={location.pathname === "/contact" ? "active" : ""}
          >
            <FaEnvelope /> Contact US
          </div>
        </li>
                <li>
          <div
            onClick={() => handleNav("/reviews")}
            className={location.pathname === "/reviews" ? "active" : ""}
          >
            <FaStarHalfAlt  /> Reviews
          </div>
        </li>
      </ul>
    </div>
  );
}
