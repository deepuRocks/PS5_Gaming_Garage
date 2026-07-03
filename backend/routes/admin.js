const express = require("express");
const pool = require("../database/db"); // adjust path to your PostgreSQL pool

const router = express.Router();

// GET all users (admin only)
router.get("/users", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, first_name, last_name, email, role FROM users ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

module.exports = router;
