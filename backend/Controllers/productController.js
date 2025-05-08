// Controllers/productController.js
const UploadProductImagesCloudinary = require("../Utilities/UploadProductImagesCloudinary");
const Category = require("../Models/CategorySchema");
const Product = require("../Models/ProductSchema");
const { validationResult } = require("express-validator");
const cloudinary = require("cloudinary");

// Create a new product
const createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  const data = req.body;
  // console.log(data.category);

  try {
    // 1.First i will check category given or not
    if (data?.category) {
      // check that given category exist or not
      const categoryObj = await Category.findOne({
        name: data.category,
      });

      //if exist
      if (categoryObj) {
        // console.log("Category already exist" + categoryObj);
        // If the category exists, set the category field in the product data to the category's ID
        data.category = categoryObj?._id;
        // console.log(categoryObj._id.toString());
      } else {
        // If the category does not exist, create a new category
        const newCategory = await Category.create({
          name: data.category,
          maker: "6808c36faf63f56a717ba3de",
        });
        // console.log("New category " + newCategory);

        if (!newCategory) {
          // console.log("New categfory not create");

          return res.status(401).json({
            success: false,
            message:
              "Failed to  create new category while creating new product",
          });
        }
        // console.log(newCategory._id);

        //set data.category= id of category model because we create product with id of cateory model
        data.category = newCategory?._id;
      }
    } else {
      return res.status(401).json({
        success: false,
        message: "Product category is required",
      });
    }

    // console.log(data.category);

    //2.If image given then check its type (url or file from local machine)
    if (req.files?.images || data?.images) {
      //validation of image format
      const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      // 3.If image in file format
      if (req.files?.images) {
        // Ensure req.files?.images is an array
        const imagesArray = Array.isArray(req.files?.images)
          ? req.files?.images
          : [req.files?.images];

        //validation of images
        for (let image of imagesArray) {
          //check given image is valid or not
          if (!allowedFormats.includes(image.mimetype)) {
            return res.status(400).json({
              success: false,
              message: `Invalid file type: ${image.mimetype}`,
            });
          }

          //check image size not exceed 5mb
          if (image.size > maxSize) {
            return res.status(400).json({
              success: false,
              message: `File size exceeds 5MB limit`,
            });
          }
        }
      }
      // 5.then call imageuploader on cloudinary function from utilities by giving parameters both
      const uploadedImages = await UploadProductImagesCloudinary(req, res);

      if (!uploadedImages) {
        return res.status(400).json({
          success: false,
          message: `Something went wrong while uploading images`,
        });
      }

      //6.now set cloudinary given images urls in data(req.body)
      data.images = uploadedImages;
    } else {
      return res.status(400).json({
        success: false,
        message: `Images are required.`,
      });
    }

    //7.now finally create product
    const product = await Product.create(data);
    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while creating product",
      });
    }

    res.status(201).json({
      success: true,
      product,
      message: "Product created successfully",
    });
  } catch (err) {
    // console.error("Error creating product:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

// Get all products
const getAllProducts = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  try {
    const {
      keyword = "",
      minPrice,
      maxPrice,
      category,
      stock = true, // true or false
      page = 1,
      limit = 8,
    } = req.query;

    // console.log(req.query);

    const filter = {};

    // if user search product (by name)
    if (keyword) {
      filter.name = { $regex: keyword, $options: "i" };
    }

    // if user specify price
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // if add category
    if (category) {
      const categoryObj = await Category.findOne({
        name: category,
      });
      if (!categoryObj) {
        return res.status(400).json({
          success: false,
          message: "Category not found",
        });
      }
      filter.category = categoryObj._id; // category should be ID from frontend id come
    }

    //  Stock or outOfStock
    if (stock === "true") {
      filter.stock = { $gt: 0 };
    } else if (stock === "false") {
      filter.stock = 0;
    }

    //  Pagination
    const pageNumber = Number(page);
    const pageSize = Number(limit) || 8; //products to show
    const totalProductToSend = pageNumber * pageSize; //after page=1 products will be skipped (8 x pageNumber)

    //  Fetch products with population and filters
    const product = await Product.find(filter)
      .populate("category", "name ")
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(totalProductToSend);

    const productCount = await Product.countDocuments(filter);

    const filterProductCount = productCount;
    const totalProductCount = await Product.countDocuments();

    res.status(200).json({
      success: true,
      product,
      message: "All products",
      productCount,
      totalProductCount,
      filterProductCount,
      totalProductToSend,
    });
  } catch (err) {
    // console.error("Error fetching products:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  try {
    // console.log(req.params.id);

    const product = await Product.findById(req.params.id)
      .populate("category", "name")
      .populate("user", "name email");
    // console.log(product);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res
      .status(200)
      .json({ success: true, product, message: "Single product details" });
  } catch (err) {
    console.error("Error fetching product:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

// Update a product by ID
const updateProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  try {
    // console.log(req.params.id + req.body.name);
    // console.log(req.files?.images);

    const product = await Product.findById(req.params?.id);
    // console.log(product);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    //if user update images also
    if (req.files?.images || req.body?.data?.images) {
      // check image comes from data base or not and also check its length greater than 1
      if (product?.images?.length > 0) {
        //apply loop on images and delete all old images
        for (const image of product.images) {
          await cloudinary.v2.uploader.destroy(image.public_id);
        }
      }

      //now upload new images on cloudinary
      const uploadedImages = await UploadProductImagesCloudinary(req, res);
      req.body.images = uploadedImages;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params?.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      product: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (err) {
    // console.error("Error updating product:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    // console.error("Error deleting product:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

// get featured products
const getFeaturedProducts = async (req, res) => {
  const { page } = req.query;
  //How many FeaturedProducts we want to show in one page
  const productsPerPage = 8;
  try {
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * productsPerPage;

    // Fetch filtered products with pagination
    const featuredProducts = await Product.find({
      isFeatured: true,
    })
      .populate("category", "name")
      .skip(skip)
      .limit(productsPerPage);

    if (!featuredProducts) {
      return res
        .status(404)
        .json({ success: false, message: "Featured products not found" });
    }

    res.status(200).json({
      success: true,
      message: "Featured products",
      product: featuredProducts,
      featuredPrductsCount: featuredProducts.length,
    });
  } catch (err) {
    // console.error("Error deleting product:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
};
