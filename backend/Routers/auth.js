const express = require("express");
const {
  signup,
  login,
  forgotPassword,
  verifyOtpAndResetPassword,
  logout,
} = require("../Controllers/authController"); // Path to your signup controller
const { body } = require("express-validator");
const authMiddleware = require("../Middlewares/authMiddleware");
const {
  loginUserValidation,
  registerUserValidation,
  forgotPasswordValidation,
} = require("../Validations/authValidation");

const router = express.Router();

// Route for user login
router.post("/login", loginUserValidation, login);

// Route for user sign up
router.post("/signup", registerUserValidation, signup);

// Route for user forgot password
router.post("/forgot-password", forgotPasswordValidation, forgotPassword);

// Route for user reset-password
router.put("/reset-password", verifyOtpAndResetPassword);

// Route for user logout
router.get("/logout", authMiddleware, logout);

module.exports = router;
