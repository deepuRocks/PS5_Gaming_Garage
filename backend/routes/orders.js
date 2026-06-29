const express = require("express");
const router = express.Router();
const pool = require("../database/db");
const jwt = require("jsonwebtoken");

// ✅ Checkout route: create new order with shipping info + cart items
router.post("/", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { name, phone, address } = req.body;
    if (!name || !phone || !address) {
      return res
        .status(400)
        .json({ error: "Name, phone, and address are required" });
    }

    // ✅ Fetch cart items with option-level pricing
    const cartResult = await pool.query(
      `SELECT c.service_id, c.option_name, c.quantity, so.price
       FROM cart c
       JOIN service_options so
         ON c.service_id = so.service_id AND c.option_name = so.option_name
       WHERE c.user_id = $1`,
      [userId],
    );

    if (cartResult.rows.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // ✅ Calculate total
    const total = cartResult.rows.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    // ✅ Insert order summary
    const orderResult = await pool.query(
      `INSERT INTO orders (user_id, shipping_name, shipping_phone, shipping_address, total, status, created_at)
       VALUES ($1, $2, $3, $4, $5, 'Pending', NOW())
       RETURNING id`,
      [userId, name, phone, address, total],
    );
    const orderId = orderResult.rows[0].id;

    // ✅ Insert order items
    for (const item of cartResult.rows) {
      await pool.query(
        `INSERT INTO order_items (order_id, service_id, option_name, quantity, price)
         VALUES ($1, $2, $3, $4, $5)`,
        [orderId, item.service_id, item.option_name, item.quantity, item.price],
      );
    }

    // ✅ Clear cart
    await pool.query("DELETE FROM cart WHERE user_id = $1", [userId]);

    res.json({ message: "Order placed successfully", orderId });
  } catch (err) {
    console.error("Error creating order:", err.message);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// ✅ Get orders summary (one row per order item, showing option name)
router.get("/", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const result = await pool.query(
      `SELECT o.id AS order_id,
          o.status,
          o.total,
          o.created_at,
          o.shipping_name,
          o.shipping_phone,
          o.shipping_address,
          s.id AS service_id,
          s.title || ' - ' || oi.option_name AS service_name,
          s.image_url,
          oi.quantity,
          oi.price
   FROM orders o
   JOIN order_items oi ON o.id = oi.order_id
   JOIN services s ON oi.service_id = s.id
   WHERE o.user_id = $1
   ORDER BY o.created_at DESC`,
      [userId],
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching orders:", err.message);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// ✅ Cancel order
router.put("/:id/cancel", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { id } = req.params;
    const { reason } = req.body;
    const statusText = `Cancelled: ${reason}`.substring(0, 100);

    const result = await pool.query(
      "UPDATE orders SET status=$1 WHERE id=$2 AND user_id=$3 RETURNING *",
      [statusText, id, decoded.id],
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Order not found or not owned by user" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error cancelling order:", err.message);
    res.status(500).json({ error: "Failed to cancel order" });
  }
});

module.exports = router;
