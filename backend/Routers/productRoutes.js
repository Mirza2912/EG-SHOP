// Routers/productRoutes.js
const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
} = require("../Controllers/productController");
const { body } = require("express-validator");
const { query } = require("express-validator");
const validateRequest = require("../Utilities/expressValidatore");

//validate getAllProducts
const validateGetAllProducts = [
  query("keyword")
    .optional()
    .isString()
    .withMessage("Keyword must be a string"),
  query("minPrice")
    .optional()
    .isNumeric()
    .withMessage("Min price must be a number"),
  query("maxPrice")
    .optional()
    .isNumeric()
    .withMessage("Max price must be a number"),
  query("stock")
    .optional()
    .isBoolean()
    .withMessage("Stock must be true or false"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Limit must be a positive integer"),
];

//validate createProduct
const validateCreateProduct = [
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
  body("isReturnAble")
    .optional()
    .isBoolean()
    .withMessage("isReturnAble must be boolean"),
  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be boolean"),
  body("productDetails")
    .optional()
    .isObject()
    .withMessage("productDetails must be an object"),
];

//validate updateProduct
const validateUpdateProduct = [
  body("name").optional().notEmpty().withMessage("Product name is required"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description is required"),
  body("price")
    .optional()
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gte: 0 })
    .withMessage("Price must be greater than 0"),
  body("stock")
    .optional()
    .notEmpty()
    .withMessage("Stock is required")
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),
  body("discount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount must be between 0 and 100"),
  body("isReturnAble")
    .optional()
    .isBoolean()
    .withMessage("isReturnAble must be boolean"),
  body("isFeatured")
    .optional()
    .isBoolean()
    .withMessage("isFeatured must be boolean"),
  body("productDetails")
    .optional()
    .isObject()
    .withMessage("productDetails must be an object"),
];

// Routes to manage products
const router = express.Router();

//this will be admin route --->Admin
router.post("/create", validateCreateProduct, validateRequest, createProduct);

//route for update product also admin route ---->Admin
router.put(
  "/updateProduct/:id",
  validateUpdateProduct,
  validateRequest,
  updateProduct
);
router.get("/", validateGetAllProducts, validateRequest, getAllProducts);
router.get("/singleProduct/:id", getProductById);
router.delete("/deleteProduct/:id", deleteProduct);
router.get("/featuredProducts", getFeaturedProducts);

module.exports = router;
