const bcrypt = require("bcryptjs");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../Models/UserSchema"); // Path to your User model
const sendEmail = require("../Utilities/sendEmail");
const { validationResult } = require("express-validator");

// Signup controller
const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(errors.array()[0].msg);

    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  const { name, email, password, phone } = req.body;

  try {
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword, // Store hashed password
      phone,
    });

    // Save the user to the database
    await newUser.save();

    // Generate JWT token (optional)
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_KEY, // Use environment variable in production
      { expiresIn: "3h" }
    );
    // Send success response
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true, // Ensures the cookie is not accessible via JavaScript
        secure: true, // 1 hour (in milliseconds)
      })
      .json({ message: "User created successfully", token, user: newUser });
  } catch (err) {
    console.error("Error during user signup:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if the user exists
    const existingUser = await User.findOne({ email });
    // console.log(existingUser);
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = await jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_KEY, // Use your secret from .env
      { expiresIn: "3h" }
    );

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true, // Secure cookie (not accessible from client-side JavaScript)
        secure: true,
      })
      .json({ message: "User logged in successfully", user: existingUser });
  } catch (err) {
    // console.error("Error during login:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const forgotPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found with this email" });
    }

    // Generate OTP (6-digit)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash OTP and set to otp and otpExpire fields
    user.otp = crypto.SHA256(otp).toString();
    user.otpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes expiration

    // Save OTP to database
    await user.save();

    // Send OTP via email
    const message = `Your OTP for password reset is: ${otp}. It will expire in 10 minutes.`;

    await sendEmail({
      email,
      subject: "Password Reset OTP",
      message,
    });

    res.status(200).json({
      success: true,
      message: `OTP sent to  ${user?.email || "your email"}`,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error in sending OTP" });
  }
};

const verifyOtpAndResetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if OTP is valid
    const hashedOtp = crypto.SHA256(otp).toString();
    console.log("OTP:", hashedOtp, user.otp, user);
    if (hashedOtp !== user.otp || user.otpExpire < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Clear OTP fields
    user.otp = undefined;
    user.otpExpire = undefined;

    // Save updated user data
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error in resetting password" });
  }
};

// Controllers/authController.js
const logout = (req, res) => {
  // Clear the authentication cookie named "token"
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // clear secure cookie in production
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

module.exports = {
  signup,
  login,
  forgotPassword,
  verifyOtpAndResetPassword,
  logout,
};
