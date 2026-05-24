require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const pool = require("../database/db"); // ✅ PostgreSQL connection

// 🔑 Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Generate JWT token using .env secret
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      role: user.role,
      token: token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// 🔑 Signup
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, countryCode, gender } = req.body;

  try {
    // Check if user already exists
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user with all fields
    await pool.query(
      `INSERT INTO users (first_name, last_name, email, role, password, phone, country_code, gender)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [firstName, lastName, email, "user", hashedPassword, phoneNumber, countryCode, gender]
    );
    

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔑 Forgot Password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Email not registered" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    await pool.query(
      "UPDATE users SET reset_token = $1, reset_token_expiry = NOW() + interval '1 hour' WHERE email = $2",
      [token, email]
    );

    // ✅ Use Gmail credentials from .env
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const resetLink = `http://localhost:3000/reset-password/${token}`;

    await transporter.sendMail({
      to: email,
      subject: "Password Reset",
      text: `Click here to reset your password: ${resetLink}`,
    });

    res.json({ message: "Reset link sent to registered email" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔑 Reset Password
router.post("/reset-password/:token", async (req, res) => {
  const { email, newPassword } = req.body;
  const { token } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND reset_token = $2 AND reset_token_expiry > NOW()",
      [email, token]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      "UPDATE users SET password = $1, reset_token = NULL, reset_token_expiry = NULL WHERE email = $2",
      [hashedPassword, email]
    );

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
