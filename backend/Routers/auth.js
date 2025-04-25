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

const router = express.Router();

// Route for user login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  login
);
// Route for user sign up
router.post(
  "/signup",
  [
    (body("email").isEmail().withMessage("Invalid Email"),
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")),
    body("phone")
      .isLength({ min: 11, max: 11 })
      .withMessage("Phone number must be 11 digits long")
      .isNumeric()
      .withMessage("Phone number must be numeric"),
  ],
  signup
);
// Route for user forgot password
router.post(
  "/forgot-password",
  [body("email").isEmail().withMessage("Invalid Email")],
  forgotPassword
);
// Route for user reset-password
router.put("/reset-password", verifyOtpAndResetPassword);
// Route for user logout
router.get("/logout", authMiddleware, logout);
module.exports = router;
