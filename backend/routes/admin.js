const express = require("express");
const pool = require("../database/db"); // adjust path to your PostgreSQL pool
const bcrypt = require("bcrypt");
const router = express.Router();

// ✅ READ: Get all users
router.get("/users", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, email, role, first_name, last_name FROM users ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
});



// CREATE user
router.post("/users", async (req, res) => {
  try {
    const { email, role, first_name, last_name, password } = req.body;

    // ✅ hash password before insert
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (email, role, first_name, last_name, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [email, role, first_name, last_name, hashedPassword]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Error creating user" });
  }
});

// UPDATE user
router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role, first_name, last_name, password } = req.body;

    let query, values;

    if (password) {
      // ✅ hash new password if provided
      const hashedPassword = await bcrypt.hash(password, 10);
      query = "UPDATE users SET email=$1, role=$2, first_name=$3, last_name=$4, password=$5 WHERE id=$6 RETURNING *";
      values = [email, role, first_name, last_name, hashedPassword, id];
    } else {
      // ✅ update without touching password
      query = "UPDATE users SET email=$1, role=$2, first_name=$3, last_name=$4 WHERE id=$5 RETURNING *";
      values = [email, role, first_name, last_name, id];
    }

    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Error updating user" });
  }
});


// ✅ DELETE: Remove user
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Error deleting user" });
  }
});

module.exports = router;
