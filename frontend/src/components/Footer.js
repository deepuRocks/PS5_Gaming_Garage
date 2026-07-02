import React from "react";
import "./Footer.css";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import footerLogo from "../assets/footer-logo.png"; // ✅ import your PNG logo

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* ✅ Left side: Logo + description */}
        <div className="footer-about">
          <div className="footer-logo">
            <img
              src={footerLogo}
              alt="PS5 Gaming Garage Logo"
              className="footer-logo-img"
            />
            <h2>PS5 Gaming Garage</h2>
          </div>
          <p>
            Expert PS5 console and controller repair services. We focus on
            quality, reliability, and keeping gamers in the game.
          </p>
          <div className="footer-icons">
            <a
              href="https://www.instagram.com/hyderabad_gaming_garage?igsh=MWRuNGt5cHhlNXU1OA%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/message/EX5ELXCPQ5WRD1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* ✅ Useful Links */}
        <div className="footer-col">
          <h4>Useful Links</h4>
          <ul>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/reviews">Reviews</a>
            </li>
          </ul>
        </div>

        {/* ✅ Positive paragraph about Hyderabad Gaming Garage */}
        <div className="footer-extra">
          <h4>Why Choose Us</h4>
          <p>
            Hyderabad Gaming Garage has become a trusted name for console and
            controller repairs. Our commitment to precision, fast turnaround,
            and gamer‑friendly service ensures that every customer leaves with
            confidence. We believe gaming should never stop, and we’re proud to
            support Hyderabad’s vibrant gaming community with passion and
            expertise.
          </p>
        </div>
      </div>

      {/* ✅ Bottom bar */}
      <div className="footer-bottom">
        <p>© 2026 PS5 Gaming Garage. All rights reserved.</p>
        <p>Gmail: ps5gaminggarage@gmail.com</p>
      </div>
    </footer>
  );
}
