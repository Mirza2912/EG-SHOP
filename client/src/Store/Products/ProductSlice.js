import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts, getSingleProduct } from "./ProductSliceReducers";

// Product slice
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    singleProduct: {},
    page: 1,
    isLoading: false,
    error: null,
    singleProductMessage: "",
  },
  reducers: {
    clearSingleProductMessage: (state) => {
      state.singleProductMessage = "";
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
      });
  },
});

export const { clearError, clearSingleProductMessage } = productSlice.actions;
export default productSlice.reducer;
