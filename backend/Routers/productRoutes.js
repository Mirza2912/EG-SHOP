// Routers/productRoutes.js
const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../Controllers/productController");
const { body } = require("express-validator");

// Routes to manage products
const router = express.Router();

//this will be admin route --->Admin
router.post(
  "/create",
  [
    body("name").notEmpty().withMessage("Product name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("price")
      .notEmpty()
      .withMessage("Price is required")
      .isFloat({ gte: 0 })
      .withMessage("Price must be greater than 0"),
    body("stock")
      .notEmpty()
      .withMessage("Stock is required")
      .isInt({ min: 0 })
      .withMessage("Stock must be a non-negative integer"),
    body("discount")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Discount must be between 0 and 100"),
    body("quantity")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
    body("category")
      .notEmpty()
      .withMessage("Category is required")
      .isMongoId()
      .withMessage("Invalid category ID"),
    body("images")
      .isArray({ min: 1 })
      .withMessage("At least one image is required"),
    body("images.*.url").notEmpty().withMessage("Image URL is required"),
    body("isReturnAble")
      .optional()
      .isBoolean()
      .withMessage("isReturnAble must be boolean"),
    body("user")
      .notEmpty()
      .withMessage("User ID is required")
      .isMongoId()
      .withMessage("Invalid user ID"),
    body("isFeatured")
      .optional()
      .isBoolean()
      .withMessage("isFeatured must be boolean"),
    body("productDetails")
      .optional()
      .isObject()
      .withMessage("productDetails must be an object"),
  ],
  createProduct
);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
