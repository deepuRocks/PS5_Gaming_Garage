import React from "react";
import { Navigate } from "react-router-dom";

/**
 * AdminRoute protects admin-only routes.
 * It checks for a valid token and role === 'admin' in localStorage.
 */
export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // stored after login

  if (!token || role !== "admin") {
    // If not logged in or not admin, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If admin, render the protected children
  return children;
}
