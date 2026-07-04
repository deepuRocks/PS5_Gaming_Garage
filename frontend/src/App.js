import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ForgotPassword from "./components/Auth/ForgotPassword";
import LoginSignup from "./components/Auth/LoginSignup";
import ResetPassword from "./components/Auth/ResetPassword";
//import AdminPage from "./components/AdminPage";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import MyOrders from "./components/MyOrders";
import Profile from "./components/Profile";
import ServiceDetail from "./components/ServiceDetail";
import AboutUs from "./pages/AboutUs";
import Reviews from "./pages/Reviews";
import ContactUs from "./pages/ContactUs";
import AdminRoute from "./pages/admin/AdminRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminServices from "./pages/admin/AdminServices";
import AdminContent from "./pages/admin/AdminContent";
import AdminFeedback from "./pages/admin/AdminFeedback";

// ✅ ProtectedRoute for normal users
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}


function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<LoginSignup />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Admin route (admin-only) */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="users" element={<AdminUsers />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="feedback" element={<AdminFeedback />} />
        </Route>

        {/* User routes (protected) */}
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
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <Layout>
              <MyOrders />
            </Layout>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Layout>
                <Cart />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Layout>
                <Checkout />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <AboutUs />
            </Layout>
          }
        />
                <Route
          path="/reviews"
          element={
            <Layout>
              <Reviews />
            </Layout>
          }
        />
                      <Route
          path="/contact"
          element={
            <Layout>
              <ContactUs />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
