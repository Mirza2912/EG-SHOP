const express = require("express");
const {
  getAllUsers,
  editUser,
  deleteUser,
  viewUser,
  changePassword,
  getUserDetails,
} = require("../Controllers/UserController");
const authMiddleware = require("../Middlewares/authMiddleware");
const adminMiddleware = require("../Middlewares/adminMiddleware");

const router = express.Router();
router.get("/user/profile", authMiddleware, getUserDetails);
router.get("/users", getAllUsers);
router.put("/users/:id", authMiddleware, adminMiddleware, editUser);
router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);
router.get("/users/:id", viewUser);
router.put("/users/changePassword/:id", changePassword);
module.exports = router;
