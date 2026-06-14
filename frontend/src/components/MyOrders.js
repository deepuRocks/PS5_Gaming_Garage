import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MyOrders.css";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading your orders...</h2>;
  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div className="orders-container">
      <h1>My Orders</h1>
      <p>Here you’ll see all your booked services and their order status.</p>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Order #</th>
            <th>Service</th>
            <th>Image</th>
            <th>Status</th>
            <th>Total</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.service_name}</td>
              <td>
                <img
                  src={order.image_url}
                  alt={order.service_name}
                  className="order-image"
                />
              </td>
              <td>{order.status}</td>
              <td>₹{order.total}</td>
              <td>{new Date(order.created_at).toLocaleDateString()}</td>
              <td>
                {/* ✅ onClick navigate to service detail */}
                <button
                  onClick={() => navigate(`/service/${order.service_id}`)}
                  className="order-btn"
                >
                  View Service
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
