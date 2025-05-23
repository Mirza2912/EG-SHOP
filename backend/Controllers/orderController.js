const Order = require("../Models/OrderSchema"); // Your Order schema with embedded orderItems
const Cart = require("../Models/CartSchema"); // Your Cart schema

// Create a new order (checkout process)
const createOrder = async (req, res) => {
  try {
    const {
      orderItems, // Expected as an array of items with: product, name, qty, price, image
      shippingAddress,
      shippingPrice,
      totalPrice,
      isPaid,
      paidAt,
      itemsPrice,
    } = req.body;

    // Validate that order items exist
    if (!orderItems || orderItems.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No order items" });
    }

    // Create a new order document with the logged-in user's ID and the order items
    const order = new Order({
      user: req.user._id, // Assumes auth middleware sets req.user.userId
      orderItems,
      shippingAddress,
      paymentMethod: "Card Payment",
      shippingPrice,
      totalPrice,
      isPaid,
      itemsPrice,
    });

    // Save the order to generate an _id
    const createdOrder = await order.save();

    // Update the user's cart accordingly.
    // Retrieve the user's cart.
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      // For each ordered item, adjust or remove the matching item from the cart.
      orderItems.forEach((orderedItem) => {
        // Find the index of the cart item with the same product.
        const index = cart.items.findIndex(
          (item) => item.product.toString() === orderedItem.product
        );
        if (index > -1) {
          // If the cart's quantity is less than or equal to the ordered quantity,
          // remove the item from the cart.
          if (cart.items[index].quantity <= orderedItem.qty) {
            cart.items.splice(index, 1);
          } else {
            // Otherwise, subtract the ordered quantity from the cart.
            cart.items[index].quantity -= orderedItem.qty;
          }
        }
      });
      await cart.save();
      // console.log(createdOrder);
    }

    res.status(201).json({ success: true, data: createdOrder });
  } catch (err) {
    console.error("Error creating order:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

// Get a single order by its ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("orderItems.product", "name price image");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (err) {
    console.error("Error fetching order:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

// Get orders placed by the currently logged-in user
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate({
        path: "orderItems.product",
        select: "name price image",
      })
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: orders,
      message: `${req.user?.name}'s all orders`,
    });
  } catch (err) {
    console.error("Error fetching user orders:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

// Get all orders (admin functionality)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email") // Populate user with name and email
      .populate("orderItems.product");

    // console.log(orders);

    res.status(200).json({
      success: true,
      data: orders,
      message: "All Orders",
    });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

// Update order status (admin functionality)
// For example, mark an order as 'Paid' or 'Delivered'
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body; // New status (e.g., 'Paid', 'Delivered', etc.)
    // console.log(status);

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: status },
      { new: true }
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    order.orderStatus = status;
    await order.save();

    res.status(200).json({
      success: true,
      data: order,
      message: "status updated successfully",
    });
  } catch (err) {
    console.error("Error updating order status:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

const getOrderByIdAdmin = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("orderItems.product", "name price image");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (err) {
    console.error("Error fetching order:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

const deleteOrderAdmin = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    console.error("Error fetching order:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderByIdAdmin,
  deleteOrderAdmin,
};
