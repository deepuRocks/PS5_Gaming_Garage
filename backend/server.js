// ✅ Conditional env loader
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
require("dotenv").config({ path: envFile });

const express = require("express");
const cors = require("cors");

// Import routes
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const serviceRoutes = require("./routes/services");
const orderRoutes = require("./routes/orders");
const cartRoutes = require("./routes/cart");
const feedbackRoutes = require("./routes/feedback");
const adminRoutes = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allow multiple origins (local + Vercel)
const allowedOrigins = [
  "http://localhost:3000",
  "https://hyderabadgaminggarage.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Hyderabad Gaming Garage backend is running!");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/admin", adminRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}, allowed origins: ${allowedOrigins.join(", ")}`);
});
