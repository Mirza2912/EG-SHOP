const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middlewares/authMiddleware");
const {
  addItemToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../Controllers/cartController");
const {
  addToCartValidation,
  updateCartValidation,
  deleteCartValidation,
} = require("../Validations/cartValidation");

// Add an item to the cart
router.post("/addToCart", addToCartValidation, authMiddleware, addItemToCart);

// Get the current user's cart
router.get("/", authMiddleware, getCart);

// Update a cart item (e.g., change quantity)
router.put("/updateCart", updateCartValidation, authMiddleware, updateCartItem);

// Remove a specific item from the cart
router.delete("/deleteCartItem/:id", authMiddleware, removeCartItem);

// Clear the entire cart for the user
router.delete("/clearCart", authMiddleware, clearCart);

module.exports = router;
