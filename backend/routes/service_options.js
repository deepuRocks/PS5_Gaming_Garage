const express = require("express");
const router = express.Router();
const pool = require("../database/db");

// ✅ Get options for a service
router.get("/:service_id", async (req, res) => {
  try {
    const { service_id } = req.params;
    const result = await pool.query(
      "SELECT * FROM service_options WHERE service_id=$1",
      [service_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching options:", err.message);
    res.status(500).json({ error: "Failed to fetch options" });
  }
});

// ✅ Add new option
router.post("/", async (req, res) => {
  try {
    const { service_id, option_name, price } = req.body;
    const result = await pool.query(
      "INSERT INTO service_options (service_id, option_name, price) VALUES ($1, $2, $3) RETURNING *",
      [service_id, option_name, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding option:", err.message);
    res.status(500).json({ error: "Failed to add option" });
  }
});

// ✅ Update option
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { option_name, price } = req.body;
    const result = await pool.query(
      "UPDATE service_options SET option_name=$1, price=$2 WHERE id=$3 RETURNING *",
      [option_name, price, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating option:", err.message);
    res.status(500).json({ error: "Failed to update option" });
  }
});

// ✅ Delete option
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM service_options WHERE id=$1", [id]);
    res.json({ message: "Option deleted successfully" });
  } catch (err) {
    console.error("Error deleting option:", err.message);
    res.status(500).json({ error: "Failed to delete option" });
  }
});

module.exports = router;
