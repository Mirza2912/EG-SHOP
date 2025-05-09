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
const {
  getAllProductsValidation,
  createProductValidation,
  updateProductValidation,
  singleProductValidation,
  deleteProductValidation,
} = require("../Validations/productValidation");

// Routes to manage products
const router = express.Router();

//this will be admin route --->Admin
router.post("/create", createProductValidation, validateRequest, createProduct);

//route for update product also admin route ---->Admin
router.put(
  "/updateProduct/:id",
  updateProductValidation,
  validateRequest,
  updateProduct
);
router.get("/", getAllProductsValidation, validateRequest, getAllProducts);
router.get("/singleProduct/:id", getProductById);
router.delete("/deleteProduct/:id", deleteProduct);
router.get("/featuredProducts", getFeaturedProducts);

module.exports = router;
