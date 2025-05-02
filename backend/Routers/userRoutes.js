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
const {
  updateUserProfileValidation,
  changeUserPasswordValidation,
  viewUserSingle,
} = require("../Validations/authValidation");

const router = express.Router();

router.get("/user/profile", authMiddleware, getUserDetails);
router.get("/users", getAllUsers);
router.put(
  "/users/me/edit-profile",
  updateUserProfileValidation,
  authMiddleware,
  editUserProfile
);
router.delete("/users/me/delete-account", authMiddleware, deleteUser);
router.get("/users/:id", viewUser);
router.put(
  "/users/me/change-password",
  changeUserPasswordValidation,
  authMiddleware,
  changePassword
);
module.exports = router;
