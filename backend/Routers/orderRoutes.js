const express = require("express");
const router = express.Router();

// Import middleware for authentication and admin authorization
const authMiddleware = require("../Middlewares/authMiddleware");
const adminMiddleware = require("../Middlewares/adminMiddleware");

// Import the order controller functions
const {
  createOrder,
  getOrderById,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../Controllers/orderController");
const { createOrderValidation } = require("../Validations/orderValidations");

// User must be authenticated
router.post("/create", createOrderValidation, authMiddleware, createOrder);

// Get orders placed by the currently logged-in user
router.get("/myorders", authMiddleware, getMyOrders);

// Get a single order by its ID
router.get("/:id", authMiddleware, getOrderById);

// Get all orders (admin only)
// Requires authentication and admin privileges
router.get("/", authMiddleware, adminMiddleware, getAllOrders);

// Update order status (admin only)
// For example, mark an order as 'Paid' or 'Delivered'
router.put("/:id", authMiddleware, adminMiddleware, updateOrderStatus);

module.exports = router;
