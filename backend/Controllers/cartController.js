const Cart = require("../Models/CartSchema");
const Product = require("../Models/ProductSchema");
const { validationResult } = require("express-validator");

// Add an item to the cart
const addItemToCart = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  try {
    const { productId, quantity, price } = req.body;
    // console.log("new product quantity :" + quantity);

    //bhai yahan pe userId nahi ana srf req.user._id because mogodb default id deti he with key of _id
    const userId = req.user._id; // Assumes auth middleware sets req.user.userId

    // Validate input
    if (!productId || !quantity || !price) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
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
    // console.log(itemIndex);

    var message = "";
    if (itemIndex > -1) {
      const product = await Product.findById(productId);

      if (product?.stock > cart.items[itemIndex]?.quantity + quantity) {
        cart.items[itemIndex].quantity += quantity;
        message = "Item quantity updated in cart";
      } else {
        cart.items[itemIndex].quantity = product?.stock;
        message = "Item quantity updated in cart to max stock";
      }
    } else {
      // Add new item to the cart
      cart.items.push({ product: productId, quantity, price });
      message = "Item added to cart";
    }

    await cart.populate("items.product");
    await cart.save();

    res.status(200).json({ success: true, cart, message });
  } catch (error) {
    console.error("Error in addItemToCart:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Retrieve the current user's cart
const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    // console.log(cart?.items[0]);

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }
    res.status(200).json({ success: true, cart, message: "All items of cart" });
  } catch (error) {
    console.error("Error in getCart:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Update the quantity of a specific cart item
const updateCartItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  try {
    const { quantity, productId, price } = req.body;
    const userId = req.user._id;
    // console.log(price);

    if (!quantity || !productId || !price) {
      return res.status(401).json({
        success: false,
        message: "quantity , id and price of product required",
      });
    }

    // Find user's cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    // Find the cart item to update
    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === productId
    );

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    // Update the quantity
    cart.items[itemIndex].quantity = quantity;
    cart.items[itemIndex].price = price;
    await cart.populate("items.product");
    await cart.save();
    // console.log(cart);

    res
      .status(200)
      .json({ success: true, cart, message: "Cart updated successfully" });
  } catch (error) {
    console.error("Error in updateCartItem:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Remove a specific item from the cart
const removeCartItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  try {
    const { id } = req.params;
    // console.log(id);
    // console.log(req.body);

    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId }).populate("items.product");
    // console.log(cart);

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    // Filter out the item to be removed
    cart.items = cart.items?.filter((item) => item._id.toString() !== id);
    await cart.save();

    // console.log(cart);

    res.status(200).json({
      success: true,
      cart,
      messaeg: "Item is removed from cart successfully",
    });
  } catch (error) {
    console.error("Error in removeCartItem:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Clear the entire cart for the user
const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared",
      cart,
      message: "cart empty successfully",
    });
  } catch (error) {
    console.error("Error in clearCart:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = {
  addItemToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};
