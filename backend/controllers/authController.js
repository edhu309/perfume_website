const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc    Register a new user
// @route   POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    user = await User.create({ name, email, password });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login user & return token
// @route   POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        role: user.role,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Forgot password — send reset email
// @route   POST /api/auth/forgot-password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal whether the email exists
      return res.json({ message: "If that email is registered, a reset link has been sent." });
    }

    // Generate token
    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save({ validateModifiedOnly: true });

    // Build reset URL (frontend)
    const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset-password/${token}`;

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Scentra Perfumes" <${process.env.SMTP_EMAIL}>`,
      to: user.email,
      subject: "Password Reset — Scentra",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px;background:#0F172A;border-radius:12px;color:#C0C0C0;">
          <h2 style="color:#38BDF8;text-align:center;">Scentra Password Reset</h2>
          <p>Hi <b>${user.name}</b>,</p>
          <p>You requested a password reset. Click the button below to set a new password. This link expires in <b>15 minutes</b>.</p>
          <div style="text-align:center;margin:24px 0;">
            <a href="${resetUrl}" style="background:#38BDF8;color:#0F172A;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;">Reset Password</a>
          </div>
          <p style="font-size:12px;color:#94A3B8;">If you didn't request this, ignore this email.</p>
        </div>
      `,
    });

    res.json({ message: "If that email is registered, a reset link has been sent." });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Failed to send reset email. Please try again." });
  }
};

// @desc    Reset password with token
// @route   POST /api/auth/reset-password/:token
const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password has been reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, forgotPassword, resetPassword };
