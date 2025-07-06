const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const router = express.Router();
const User = require("../models/User");

// -----------------------------
// 🔐 Sign Up
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// 🔐 Sign In
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// -----------------------------
// ✉️ Email Sender Utility
const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"DocuBridge Support" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
};

// -----------------------------
// 🟡 Request OTP for Forgot Password
router.post("/request-reset-otp", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    user.resetOTP = otp;
    user.resetOTPExpiry = expiry;
    await user.save();

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"DocuBridge" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset OTP",
      text: `Your OTP is ${otp}. Valid for 10 minutes.`,
    });

    res.json({ message: "OTP sent to your email" });

  } catch (err) {
    console.error("❌ Email Sending Failed:", err);
    res.status(500).json({ error: "Something went wrong in sending OTP" });
  }
});


// ✅ Verify OTP and Reset Password
router.post("/verify-otp-reset", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (
      !user ||
      user.resetOTP !== otp ||
      !user.resetOTPExpiry ||
      user.resetOTPExpiry < Date.now()
    ) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOTP = null;
    user.resetOTPExpiry = null;
    await user.save();

    res.json({ message: "Password reset successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to reset password" });
  }
});

module.exports = router;
