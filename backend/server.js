require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth"); // adjust path if needed

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000" })); // allow frontend
app.use(express.json()); // parse JSON bodies

// Routes
app.get("/", (req, res) => {
  res.send("PS5 Gaming Garage backend is running!");
});

app.use("/api/auth", authRoutes); // ✅ mount auth routes

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
