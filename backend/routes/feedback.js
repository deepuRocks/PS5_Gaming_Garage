const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // ✅ Respond immediately so frontend alert shows instantly
    res.status(200).json({ success: true, message: "Feedback sent!" });

    // 🔄 Send email in background
    setImmediate(async () => {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,   // from .env
            pass: process.env.GMAIL_PASS    // Gmail App Password
          }
        });

        await transporter.sendMail({
          from: email,
          to: process.env.GMAIL_USER,
          subject: `Feedback from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        });

        console.log("Feedback email sent successfully");
      } catch (error) {
        console.error("Background feedback email failed:", error.message);
      }
    });
  } catch (error) {
    console.error("Error preparing feedback:", error);
    res.status(500).json({ success: false, message: "Failed to send feedback" });
  }
});

module.exports = router;
