import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignup from "./components/Auth/LoginSignup";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import AdminPage from "./components/AdminPage";
import Dashboard from "./components/Dashboard";
import ServiceDetail from "./components/ServiceDetail";
import Layout from "./components/Layout";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<LoginSignup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Admin route */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Wrapped routes with Header/Footer/Sidebar */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/service/:id"
          element={
            <Layout>
              <ServiceDetail />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
