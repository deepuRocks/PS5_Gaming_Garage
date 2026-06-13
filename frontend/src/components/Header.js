import React, { useState } from "react";
import "./Header.css";
import logoImage from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";   // ✅ import here

export default function Header({ onSearch }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();                // ✅ call at top level

  const handleSearch = () => {
    onSearch(query); // send search term to Dashboard
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();              // ✅ prevent default link behavior
    localStorage.removeItem("token"); // ✅ clear session
    navigate("/login");               // ✅ redirect to login/signup
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logoImage} alt="PS5 Gaming Garage" className="logo-image" />
        <span><b>Hyderabad Gaming Garage</b></span>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for repairs and services ..."
            className="search-bar"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="search-button">
            <FaSearch />
          </button>
        </div>
      </div>
      <nav className="nav">
        <a href="/cart">Cart</a>
        <a href="/login" onClick={handleLogout}>Logout</a> {/* ✅ text link works as button */}
      </nav>
    </header>
  );
}
