import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./AdminLayout.css";   // ✅ import CSS

export default function AdminLayout() {
  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li><Link to="users">Users</Link></li>
            <li><Link to="orders">Orders</Link></li>
            <li><Link to="services">Services</Link></li>
            <li><Link to="content">Content</Link></li>
            <li><Link to="feedback">Feedback</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        <h1>Welcome, Ranadheer...🙂</h1>
        <Outlet />
      </main>
    </div>
  );
}
