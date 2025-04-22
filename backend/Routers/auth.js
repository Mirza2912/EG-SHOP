const express = require("express");
const {
  signup,
  login,
  forgotPassword,
  verifyOtpAndResetPassword,
  logout,
} = require("../Controllers/authController"); // Path to your signup controller
const { body } = require("express-validator");

const router = express.Router();

// Route for user signup
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
router.post("/forgot-password", forgotPassword);
router.put("/reset-password", verifyOtpAndResetPassword);
router.get("/logout", logout);
module.exports = router;
