const express = require("express");
const {
  getAllUsers,
  deleteUser,
  viewUser,
  changePassword,
  getUserDetails,
  editUserProfile,
  updateUserRole,
  deleteUserAdmin,
  suspendUser,
  unsSuspendUSer,
} = require("../Controllers/userController.js");
const authMiddleware = require("../Middlewares/authMiddleware");
const {
  updateUserProfileValidation,
  changeUserPasswordValidation,
  viewUserSingle,
} = require("../Validations/authValidation");
const adminMiddleware = require("../Middlewares/adminMiddleware");

const router = express.Router();

router.get("/user/profile", authMiddleware, getUserDetails);
router.get("/users", authMiddleware, getAllUsers);
router.put(
  "/users/me/edit-profile",
  updateUserProfileValidation,
  authMiddleware,
  editUserProfile
);
router.delete("/users/me/delete-account", authMiddleware, deleteUser);
router.delete(
  "/user/delete-account/:id",
  authMiddleware,
  adminMiddleware,
  deleteUserAdmin
);
router.get("/user/:id", authMiddleware, adminMiddleware, viewUser);
router.put("/user/suspend/:id", authMiddleware, adminMiddleware, suspendUser);
router.put(
  "/user/un-suspend/:id",
  authMiddleware,
  adminMiddleware,
  unsSuspendUSer
);
router.put(
  "/user/update-role/:id",
  authMiddleware,
  adminMiddleware,
  updateUserRole
);
router.put(
  "/users/me/change-password",
  changeUserPasswordValidation,
  authMiddleware,
  changePassword
);
module.exports = router;
