const express = require("express");
const router = express.Router();

// Example placeholder route
router.get("/", (req, res) => {
  res.send("Orders route working!");
});

// ✅ Export router
module.exports = router;
