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

// Add an item to the cart
router.post("/addToCart", authMiddleware, addItemToCart);
// make a express-validator body for my this route in which make sure to add validator for productId which will be a mongo id and quantity which will be an integer like 1 , 2 , ,3 etc and in last add validator for price

// Get the current user's cart
router.get("/", authMiddleware, getCart);

// Update a cart item (e.g., change quantity)
router.put("/updateCart", authMiddleware, updateCartItem);
// make a express-validator body for my this route in which make sure to add validator for productId which will be a mongo id and quantity which will be an integer like 1 , 2 , ,3 etc

// Remove a specific item from the cart
router.delete("/deleteCartItem/:id", authMiddleware, removeCartItem);

// Clear the entire cart for the user
router.delete("/clearCart", authMiddleware, clearCart);

module.exports = router;
