import { createSlice } from "@reduxjs/toolkit";
import {
  addToFeatured,
  createNewProduct,
  deleteProduct,
  getAllProducts,
  getALlProductsAdmin,
  getSingleProduct,
  getSingleProductAdmin,
} from "./ProductSliceReducers";

// Product slice
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    adminProducts: [],
    singleProduct: {},
    singleProductAdmin: {},
    page: 1,
    isLoading: false,
    error: null,
    singleProductMessage: "",
    deleteProductMessage: "",
    addToFeaturedProduct: "",

    productCreateMessage: "",
  },
  reducers: {
    clearSingleProductMessage: (state) => {
      state.singleProductMessage = "";
    },
    clearDeleteProductMessage: (state) => {
      state.deleteProductMessage = "";
    },
    clearAddToFeaturedProduct: (state) => {
      state.addToFeaturedProduct = "";
    },
    clearProductCreateMessage: (state) => {
      state.productCreateMessage = "";
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const product = action.payload;
        state.singleProduct[product._id] = product;
        // state.singleProduct = action.payload;
        // state.singleProductMessage = action.payload?.message;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getALlProductsAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getALlProductsAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminProducts = action.payload;
      })
      .addCase(getALlProductsAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getSingleProductAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSingleProductAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleProductAdmin = action.payload;
      })
      .addCase(getSingleProductAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const deleteProductId = action.meta.arg;
        state.adminProducts = state.adminProducts?.filter(
          (prod) => prod._id !== deleteProductId
        );
        state.deleteProductMessage = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addToFeatured.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToFeatured.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addToFeaturedProduct = action.payload;
      })
      .addCase(addToFeatured.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createNewProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productCreateMessage = action.payload?.message;
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearSingleProductMessage,
  clearDeleteProductMessage,
  clearAddToFeaturedProduct,
  clearProductCreateMessage,
} = productSlice.actions;
export default productSlice.reducer;
