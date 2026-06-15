import React, { useState, useEffect } from "react";
import "./Header.css";
import logoImage from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Header({ onSearch }) {
  const [query, setQuery] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const first = localStorage.getItem("first_name") || "";
    const last = localStorage.getItem("last_name") || "";
    if (first || last) {
      setUsername(`${first} ${last}`.trim());
    }
  }, []);

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    navigate("/login");
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
        {username && <span className="welcome">Hello {username}</span>}
        <a href="/cart">Cart</a>
        <a href="/login" onClick={handleLogout}>Logout</a>
      </nav>
    </header>
  );
}
