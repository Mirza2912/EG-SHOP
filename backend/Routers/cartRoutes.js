const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/authMiddleware');
const {
  addItemToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require('../Controllers/cartController');

// Add an item to the cart
router.post('/', authMiddleware, addItemToCart);

// Get the current user's cart
router.get('/', authMiddleware, getCart);

// Update a cart item (e.g., change quantity)
router.put('/:itemId', authMiddleware, updateCartItem);

// Remove a specific item from the cart
router.delete('/:itemId', authMiddleware, removeCartItem);

// Clear the entire cart for the user
router.delete('/', authMiddleware, clearCart);

module.exports = router;
