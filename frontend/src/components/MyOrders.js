import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MyOrders.css";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const navigate = useNavigate();

  const cancelReasons = [
    "Found cheaper elsewhere",
    "Changed my mind",
    "Service delay",
    "Other",
  ];

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

  const handleCancelOrder = (orderId) => {
    if (!cancelReason) {
      alert("Please select a reason before cancelling.");
      return;
    }
    const token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:5000/api/orders/${orderId}/cancel`,
        { reason: cancelReason },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then(() => {
        alert("Order cancelled successfully.");
        setOrders(orders.filter((o) => o.order_id !== orderId));
        setCancelOrderId(null);
        setCancelReason("");
      })
      .catch((err) => console.error("Error cancelling order:", err));
  };

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
                <button
                  onClick={() => navigate(`/service/${order.service_id}`)}
                  className="order-btn"
                >
                  View Service
                </button>
                {cancelOrderId === order.order_id ? (
                  <div className="cancel-reasons">
                    {cancelReasons.map((r) => (
                      <label key={r}>
                        <input
                          type="radio"
                          name={`cancel-${order.order_id}`}
                          value={r}
                          onChange={() => setCancelReason(r)}
                        />
                        {r}
                      </label>
                    ))}
                    <button
                      onClick={() => handleCancelOrder(order.order_id)}
                      className="btn-confirm-cancel"
                    >
                      Confirm Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setCancelOrderId(order.order_id)}
                    className="btn-cancel-order"
                  >
                    Cancel Order
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
