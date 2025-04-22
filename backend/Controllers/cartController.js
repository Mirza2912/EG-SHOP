const Cart = require('../Models/CartSchema');

// Add an item to the cart
const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity, price } = req.body;
    const userId = req.user.userId; // Assumes auth middleware sets req.user.userId

    // Validate input
    if (!productId || !quantity || !price) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Find the user's cart or create a new one
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if the product already exists in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // If the product exists, update the quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new item to the cart
      cart.items.push({ product: productId, quantity, price });
    }

    cart.updatedAt = Date.now();
    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error("Error in addItemToCart:", error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Retrieve the current user's cart
const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error("Error in getCart:", error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Update the quantity of a specific cart item
const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.userId;

    if (quantity == null) {
      return res.status(400).json({ success: false, message: 'Quantity is required' });
    }

    // Find user's cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    // Find the cart item to update
    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: 'Item not found in cart' });
    }

    // Update the quantity
    cart.items[itemIndex].quantity = quantity;
    cart.updatedAt = Date.now();
    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error("Error in updateCartItem:", error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Remove a specific item from the cart
const removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.user.userId;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    // Filter out the item to be removed
    cart.items = cart.items.filter(
      (item) => item._id.toString() !== itemId
    );
    cart.updatedAt = Date.now();
    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error("Error in removeCartItem:", error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Clear the entire cart for the user
const clearCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.items = [];
    cart.updatedAt = Date.now();
    await cart.save();

    res.status(200).json({ success: true, message: 'Cart cleared', data: cart });
  } catch (error) {
    console.error("Error in clearCart:", error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = {
  addItemToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};
