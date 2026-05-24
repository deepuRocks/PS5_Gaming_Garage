require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Import routes
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const serviceRoutes = require("./routes/services"); // ✅ single import
const orderRoutes = require("./routes/orders");
const cartRoutes = require("./routes/cart");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("PS5 Gaming Garage backend is running!");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/services", serviceRoutes); // ✅ matches import
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
