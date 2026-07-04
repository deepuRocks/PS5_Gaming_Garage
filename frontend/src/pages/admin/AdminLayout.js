import React from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li>
              <div
                onClick={() => handleNav("/admin/users")}
                className={location.pathname === "/admin/users" ? "active" : ""}
              >
                Users
              </div>
            </li>
            <li>
              <div
                onClick={() => handleNav("/admin/orders")}
                className={location.pathname === "/admin/orders" ? "active" : ""}
              >
                Orders
              </div>
            </li>
            <li>
              <div
                onClick={() => handleNav("/admin/services")}
                className={location.pathname === "/admin/services" ? "active" : ""}
              >
                Services
              </div>
            </li>
            <li>
              <div
                onClick={() => handleNav("/admin/content")}
                className={location.pathname === "/admin/content" ? "active" : ""}
              >
                Content
              </div>
            </li>
            <li>
              <div
                onClick={() => handleNav("/admin/feedback")}
                className={location.pathname === "/admin/feedback" ? "active" : ""}
              >
                Feedback
              </div>
            </li>
                        <li>
              <div
                onClick={() => handleNav("/admin/logout")}
                className={location.pathname === "/admin/logout" ? "active" : ""}
              >
                Logout
              </div>
            </li>
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
