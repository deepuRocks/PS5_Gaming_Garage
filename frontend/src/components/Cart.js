import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch cart items from backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to view cart.");
      return;
    }

    fetch("http://localhost:5000/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setCart(data))
      .catch((err) => console.error("Error fetching cart:", err));
  }, []);

  const updateQuantity = (index, delta) => {
    const newCart = [...cart];
    newCart[index].quantity += delta;

    const token = localStorage.getItem("token");

    if (newCart[index].quantity <= 0) {
      // ✅ Remove from DB when quantity hits 0
      const itemId = newCart[index].id;
      fetch(`http://localhost:5000/api/cart/${itemId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(() => console.log("Cart item deleted from DB"))
        .catch((err) => console.error("Error deleting cart item:", err));

      newCart.splice(index, 1);
    } else {
      // ✅ Update quantity in DB
      const itemId = newCart[index].id;
      fetch(`http://localhost:5000/api/cart/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newCart[index].quantity }),
      })
        .then(() => console.log("Cart item updated in DB"))
        .catch((err) => console.error("Error updating cart item:", err));
    }

    setCart(newCart);
  };

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to place orders.");
      return;
    }

    Promise.all(
      cart.map((item) =>
        fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            service_id: item.service_id,
            option_name: item.option_name, // ✅ include option_name in order
            price: item.price,
            quantity: item.quantity,
          }),
        }).then((res) => res.json()),
      ),
    )
      .then(() => {
        alert("Order placed successfully!");
        setCart([]); // ✅ clear cart in UI
        navigate("/orders");
      })


      .catch((err) => console.error("Error placing order:", err));
  };

  return (
    <div className="cart-container">
      <h1>My Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Option</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, i) => (
                <tr key={item.id}>
                  <td>{item.service_name}</td>
                  <td>{item.option_name}</td> {/* ✅ show option_name */}
                  <td>
                    <button onClick={() => updateQuantity(i, -1)}>-</button>
                    {item.quantity}
                    <button onClick={() => updateQuantity(i, 1)}>+</button>
                  </td>
                  <td>₹{item.price}</td>
                  <td>₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>Grand Total: ₹{getTotal()}</h2>
          <button onClick={placeOrder}>Place Order</button>
        </>
      )}
    </div>
  );
}
