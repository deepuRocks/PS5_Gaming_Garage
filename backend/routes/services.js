const express = require("express");
const router = express.Router();
const pool = require("../database/db"); // ✅ correct path to your db.js

// -----------------------------
// GET all services
// -----------------------------
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM services ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching services:", err.message);
    res.status(500).send("Server error");
  }
});

// -----------------------------
// GET single service by ID + options
// -----------------------------
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const service = await pool.query("SELECT * FROM services WHERE id = $1", [id]);
    if (service.rows.length === 0) {
      return res.status(404).json({ msg: "Service not found" });
    }

    const options = await pool.query("SELECT * FROM service_options WHERE service_id = $1", [id]);

    res.json({ service: service.rows[0], options: options.rows });
  } catch (err) {
    console.error("Error fetching service by ID:", err.message);
    res.status(500).send("Server error");
  }
});


// -----------------------------
// POST new service
// -----------------------------
router.post("/", async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const result = await pool.query(
      "INSERT INTO services (title, description, price, category) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, price, category]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding service:", err.message);
    res.status(500).send("Server error");
  }
});

// -----------------------------
// PUT update service by ID
// -----------------------------
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, category } = req.body;

    const result = await pool.query(
      "UPDATE services SET title=$1, description=$2, price=$3, category=$4 WHERE id=$5 RETURNING *",
      [title, description, price, category, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Service not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating service:", err.message);
    res.status(500).send("Server error");
  }
});

// -----------------------------
// DELETE service by ID
// -----------------------------
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM services WHERE id=$1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Service not found" });
    }

    res.json({ msg: "Service deleted successfully" });
  } catch (err) {
    console.error("Error deleting service:", err.message);
    res.status(500).send("Server error");
  }
});

// ✅ Export router
module.exports = router;
