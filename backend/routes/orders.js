const express = require("express");
const router = express.Router();
const pool = require("../database/db");
const jwt = require("jsonwebtoken");

// ✅ Create new order
router.post("/", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { service_id, option_name, price, quantity } = req.body;

    if (!service_id) {
      return res.status(400).json({ error: "service_id is required" });
    }

    // ✅ Calculate total
    const total = price * quantity;

    const result = await pool.query(
      `INSERT INTO orders (user_id, service_id, option_name, price, quantity, total, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       RETURNING *`,
      [decoded.id, service_id, option_name, price, quantity, total],
    );
    // ✅ Clear cart for this user
    await pool.query("DELETE FROM cart WHERE user_id=$1", [decoded.id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error creating order:", err.message);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// ✅ Get all orders for logged-in user
router.get("/", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const result = await pool.query(
      `SELECT o.id AS order_id,
              o.status,
              o.total,
              o.created_at,
              s.id AS service_id,
              s.title AS service_name,
              s.image_url
       FROM orders o
       JOIN services s ON o.service_id = s.id
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

// ✅ Cancel order with reason
router.put("/:id/cancel", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { id } = req.params;
    const { reason } = req.body;

    // ✅ Truncate reason if too long (safety)
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
