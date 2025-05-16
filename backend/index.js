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

const feedbackRouters = require('./Routers/feedbackRouter')
// Connect to MongoDB
connectDB();
// console.log(cloudinary.v2.uploader);

const app = express();
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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
