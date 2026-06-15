const express = require("express");
const router = express.Router();
const pool = require("../database/db");
const jwt = require("jsonwebtoken");

// ✅ Add item to cart
router.post("/", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { service_id, option_name, quantity } = req.body;

    const result = await pool.query(
      `INSERT INTO cart (user_id, service_id, option_name, quantity, created_at, updated_at)
       VALUES ($1, $2, $3, $4, NOW(), NOW())
       RETURNING *`,
      [decoded.id, service_id, option_name, quantity],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error adding to cart:", err.message);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

// ✅ Get cart items for logged-in user (with correct option price)
router.get("/", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const result = await pool.query(
      `SELECT c.id, c.service_id, c.option_name, c.quantity, c.created_at, c.updated_at,
       s.title AS service_name, so.price, s.image_url
FROM cart c
JOIN services s ON c.service_id = s.id
JOIN service_options so 
  ON c.service_id = so.service_id 
 AND c.option_name = so.option_name
WHERE c.user_id = $1`,
      [decoded.id],
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching cart:", err.message);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// ✅ Update quantity
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const result = await pool.query(
      "UPDATE cart SET quantity=$1, updated_at=NOW() WHERE id=$2 RETURNING *",
      [quantity, id],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating cart:", err.message);
    res.status(500).json({ error: "Failed to update cart item" });
  }
});

// ✅ Delete cart item
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM cart WHERE id=$1", [id]);
    res.json({ message: "Cart item removed" });
  } catch (err) {
    console.error("Error deleting cart item:", err.message);
    res.status(500).json({ error: "Failed to delete cart item" });
  }
});

module.exports = router;
