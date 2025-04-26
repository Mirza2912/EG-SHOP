import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "./ProductSliceReducers";

// Product slice
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    page: 1,
    isLoading: false,
    error: null,
  },
  reducers: {
    incrementPage: (state) => {
      state.page += 1;
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
      });
  },
});

export const { clearError, incrementPage } = productSlice.actions;
export default productSlice.reducer;
