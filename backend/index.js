require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./Routers/auth");
const userRoutes = require("./Routers/userRoutes");
const connectDB = require("./Db/db"); // Import the connectDB function
const productRoutes = require("./Routers/productRoutes");
const categoryRoutes = require("./Routers/categoryRoutes");
const cartRoutes = require("./Routers/cartRoutes");
const orderRoutes = require("./Routers/orderRoutes");
const paymentRouters = require("./Routers/paymentRoute");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const http = require("http");

const feedbackRouters = require("./Routers/feedbackRouter");
const User = require("./Models/UserSchema");
const Message = require("./Models/MessageSchema");
// Connect to MongoDB
connectDB();
// console.log(cloudinary.v2.uploader);

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

app.use(cors());

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRouters);
app.use("/api/messages", feedbackRouters);

// Get chat messages between user and admin
app.post("/api/messages", async (req, res) => {
  try {
    const _admin = await User.findOne({ role: "admin" });
    const { userId } = req.body;

    if (!_admin || !userId) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: _admin._id },
        { sender: _admin._id, receiver: userId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all messages
app.get("/api/messages/all", async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching all messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Socket.IO
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join", (userId) => {
    console.log("User joined:", userId);
    socket.join(userId);
    socket.emit("join", { msg: "User joined." });
  });

  socket.on("message", async ({ sender, message }) => {
    console.log("User message:", message);
    try {
      const _admin = await User.findOne({ role: "admin" });
      if (_admin) {
        const newMsg = new Message({
          sender,
          receiver: _admin._id,
          message,
        });
        const savedMessage = await newMsg.save();
        io.emit("message", savedMessage);
        io.emit("adminMessage", savedMessage);
      }
    } catch (error) {
      console.error("Error saving user message:", error);
    }
  });

  socket.on("adminMessage", async ({ sender, receiver, message }) => {
    console.log("Admin message:", message);
    try {
      const newMsg = new Message({ sender, receiver, message });
      const savedMessage = await newMsg.save();
      io.emit("adminMessage", savedMessage);
      io.emit("message", savedMessage);
    } catch (error) {
      console.error("Error saving admin message:", error);
    }
  });

  socket.on("disconnects", () => {
    console.log("User disconnected:", socket.id);
    socket.emit("notConnect", { msg: "User disconnected" });
  });
});

// Uncaught Exception & Rejection Handlers
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", promise, "reason:", reason);
});

// Configuration of Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
