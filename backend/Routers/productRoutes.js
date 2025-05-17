// Routers/productRoutes.js
const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  addToFeatured,
  getAllProductsAdmin,
  makeUnFeatured,
} = require("../Controllers/productController");
const { body } = require("express-validator");
const { query } = require("express-validator");
const validateRequest = require("../Utilities/expressValidatore");
const {
  getAllProductsValidation,
  createProductValidation,
  updateProductValidation,
  singleProductValidation,
  deleteProductValidation,
} = require("../Validations/productValidation");
const authMiddleware = require("../Middlewares/authMiddleware");
const adminMiddleware = require("../Middlewares/adminMiddleware");

// Routes to manage products
const router = express.Router();

//this will be admin route --->Admin
router.post(
  "/create",
  createProductValidation,
  validateRequest,
  authMiddleware,
  adminMiddleware,
  createProduct
);

//route for update product also admin route ---->Admin
router.put(
  "/updateProduct/:id",
  updateProductValidation,
  validateRequest,
  updateProduct
);
router.put(
  "/make-feature-product/:id",
  authMiddleware,
  adminMiddleware,
  addToFeatured
);
router.put(
  "/make-product-unfeatured/:id",
  authMiddleware,
  adminMiddleware,
  makeUnFeatured
);
router.get(
  "/admin/products",
  authMiddleware,
  adminMiddleware,
  getAllProductsAdmin
);
router.get("/", getAllProductsValidation, validateRequest, getAllProducts);
router.get("/singleProduct/:id", getProductById);
router.delete(
  "/deleteProduct/:id",
  authMiddleware,
  adminMiddleware,
  deleteProduct
);
router.get("/featuredProducts", getFeaturedProducts);

module.exports = router;
