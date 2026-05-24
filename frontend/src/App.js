import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignup from "./components/Auth/LoginSignup";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import AdminPage from "./components/AdminPage";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route → Login/Signup */}
        <Route path="/" element={<LoginSignup />} />

        {/* Forgot/Reset password flow */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Role-based redirects */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
