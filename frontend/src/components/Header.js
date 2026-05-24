import React, { useState } from "react";
import "./Header.css";
import logoImage from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";

export default function Header({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query); // send search term to Dashboard
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // ✅ trigger search on Enter
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logoImage} alt="PS5 Gaming Garage" className="logo-image" />
        <span>PS5 Gaming Garage</span>
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
        <a href="/dashboard">Dashboard</a>
        <a href="/profile">Profile</a>
        <a href="/cart">Cart</a>
        <a href="/logout">Logout</a>
      </nav>
    </header>
  );
}
