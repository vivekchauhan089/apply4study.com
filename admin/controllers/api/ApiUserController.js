let router = require('express').Router();
let config = require('../../config/config');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
let crypto = require("crypto");
let sendgridemail = require('../../lib/email');
let rn = require('random-number');
let notificationContent = require('../../lib/notificationContent');
let s3Upload = require('../../lib/s3Upload');
let reCAPTCHA = require('../../lib/reCAPTCHA');

const Users = require.main.require("./models/Users"); // adjust path as needed

// ===============================
// 🔹 1. Register User
// ===============================
async function register (req, res) {
  try {
    const { first_name, last_name, email, mobile_number, password="Study2025", role, recaptcha } = req.body;

    if (!first_name || !email || !password || !recaptcha) {
      res.status(400).json({ message: "Missing required fields" });
    }

    // 🔐 Verify reCAPTCHA
    const isValidCaptcha = await verifyRecaptcha(recaptcha);
    if (!isValidCaptcha) {
      res.status(400).json({ success: false, message: "reCAPTCHA Verification failed" });
    }

    const existingUser = await Users.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Users({
      first_name,
      last_name,
      email,
      mobile_number,
      password: hashedPassword,
      salt,
      role,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", user_id: newUser._id });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// ===============================
// 🔹 2. Forgot Password (token generation)
// ===============================
async function forgotPassword (req, res) {
  try {
    const { email } = req.body;
    const user = await Users.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = await bcrypt.hash(resetToken, 10);
    user.reset_token = resetTokenHash;
    user.reset_token_expires = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    // Here you'd send resetToken via email
    res.json({
      message: "Password reset link generated",
      token: resetToken, // ⚠️ In production, send via email instead
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// ===============================
// 🔹 3. Set New Password
// ===============================
async function setPassword (req, res) {
  try {
    const { email, token, new_password } = req.body;
    const user = await Users.findOne({ email });
    if (!user || !user.reset_token) return res.status(400).json({ message: "Invalid request" });

    const isValid = await bcrypt.compare(token, user.reset_token);
    if (!isValid || Date.now() > user.reset_token_expires)
      return res.status(400).json({ message: "Invalid or expired token" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(new_password, salt);
    user.salt = salt;
    user.reset_token = undefined;
    user.reset_token_expires = undefined;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Set Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// ===============================
// 🔹 4. Update User Profile
// ===============================
async function updateUser (req, res) {
  try {
    const userId = req.params.id;
    const updateFields = { ...req.body, updated_at: new Date() };

    // Prevent password updates here (use set_password instead)
    delete updateFields.password;
    delete updateFields.salt;

    const updatedUser = await Users.findByIdAndUpdate(userId, updateFields, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { register, forgotPassword, setPassword, updateUser };