// Controllers/productController.js
const UploadProductImagesCloudinary = require("../Utilities/UploadProductImagesCloudinary");
const Category = require("../Models/CategorySchema");
const Product = require("../Models/ProductSchema");

// Create a new product
const createProduct = async (req, res) => {
  const data = req.body;
  // console.log(data);

  try {
    // 1.First i will check category given or not
    if (data?.category) {
      //if category comes it will be an string or category name not ID
      //if category first we check that given category exist or not
      const categoryObj = await Category.findOne({
        category: data.category,
      });

      // console.log(categoryObj);

      //if categpryObj === true
      if (categoryObj) {
        //add category._id because we add feature of caterofgy by ref of category model
        data.category = categoryObj._id;
        // console.log(categoryObj.category);
      } else {
        //else create new category
        const newCategory = await Category.create({
          category: data.category,
          maker: "6808c36faf63f56a717ba3de",
        });
        // console.log(newCategory);

        if (!newCategory) {
          // console.log(newCategory);

          res.status(401).json({
            success: false,
            message:
              "Failed to  create new category while creating new product",
          });
        }
        // console.log(newCategory._id);

        //set data.category= id of category model because we create product with id of cateory model
        data.category = newCategory._id;
      }
      // console.log(data);
    } else {
      res.status(401).json({
        success: false,
        message: "Product category is required",
      });
    }

    //1.i will first check imgae given or not (image can be two type first is image from local machine and url from website)
    if (req.files?.images || data?.images) {
      // console.log("images given checlk : " + req.files?.images);
      // console.log("images given checlk : " + data?.images);
      //validation
      const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      //validation of images
      // for (let image of data?.images) {
      //   console.log("check size of images : " + data?.images);

      //   if (!allowedFormats.includes(image.mimetype)) {
      //     console.log("formet not allowed");

      //     res.status(400).json({
      //       success: false,
      //       message: `Invalid file type: ${image.mimetype}`,
      //     });
      //   }
      //   if (image.size > maxSize) {
      //     console.log("Exceed size");

      //     res.status(400).json({
      //       success: false,
      //       message: `File size exceeds 5MB limit`,
      //     });
      //   }
      // }
      // const imagesArray = Array.isArray(images) ? images : [images];
      // console.log(typeof imagesArray);

      const uploadedImages = await UploadProductImagesCloudinary(req, res);
      // console.log("upploadImages" + uploadedImages);

      data.images = uploadedImages;
      // console.log("data after upload" + data);
    } else {
      res.status(400).json({
        success: false,
        message: `Images are required.`,
      });
    }

    // 2.then i will check is imgae in url form (mean image pich from google) or given from local machine
    // 3.then call imageuploader on cloudinary function from utilities by giving parameters both

    // req.body should contain all necessary product fields including category id
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
      message: "Product created successfully",
    });
  } catch (err) {
    console.error("Error creating product:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    //1.I will add filteration also here
    //2.First search by keyword
    //3.filter by min and max price
    //4.by category
    //5.perform pagination also
    //6.add anyone in mind
    const products = await Product.find().populate("category", "category");
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.error("Error fetching products:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    console.error("Error fetching product:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    console.error("Error updating product:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
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
    console.error("Error deleting product:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
