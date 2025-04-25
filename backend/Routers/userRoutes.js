const express = require("express");
const {
  getAllUsers,
  deleteUser,
  viewUser,
  changePassword,
  getUserDetails,
  editUserProfile,
} = require("../Controllers/UserController");
const { body } = require("express-validator");
const authMiddleware = require("../Middlewares/authMiddleware");

const router = express.Router();

router.get("/user/profile", authMiddleware, getUserDetails);
router.get("/users", getAllUsers);
router.put(
  "/users/me/edit-profile",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
    body("phone")
      .isLength({ min: 11, max: 11 })
      .withMessage("Phone number must be 11 digits long")
      .isNumeric()
      .withMessage("Phone number must be numeric"),
  ],
  authMiddleware,
  editUserProfile
);
router.delete("/users/me/delete-account", authMiddleware, deleteUser);
router.get("/users/:id", viewUser);
router.put(
  "/users/me/change-password",
  [
    body("oldPassword")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("New Password must be at least 6 characters long"),
    body("confirmPassword")
      .isLength({ min: 6 })
      .withMessage("Confirm Password must be at least 6 characters long"),
  ],
  authMiddleware,
  changePassword
);
module.exports = router;
