import { createSlice } from "@reduxjs/toolkit";
import {
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
} from "./CartLocalStorageHandle";
import { addToCartBackend, getCart } from "./CartSliceReducers";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: loadCartFromLocalStorage(), //will be an array
    isLoading: false,
    error: null,
    addToCartBackendMessage: "",
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
    //when user not logged in then user can add item to cart
    addToCartLocal: (state, action) => {
      const itemToAdd = action.payload; //store product item in which product._id store and price and quantity
      const existItem = state.cartItems?.find(
        (item) => item.productId === itemToAdd.productId
      );

      if (existItem) {
        existItem.quantity += itemToAdd.quantity;
      } else {
        state.cartItems.push(itemToAdd);
      }
      saveCartToLocalStorage(state.cartItems);
    },

    //update cart when user not logged in
    updateCartItemLocal: (state, action) => {
      const { productId, quantity } = action.payload; //user only can update quantity
      const itemToUpdate = state.cartItems.find(
        (item) => item.productId === productId
      );
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
        saveCartToLocalStorage(state.cartItems);
      }
    },

    //remove cart item when use not logged in
    removeCartItemLocal: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload //action.payload will be only productId
      );
      saveCartToLocalStorage(state.cartItems);
    },

    //clear whole cart when user not logged in
    clearCartLocal: (state) => {
      state.cartItems = [];
      saveCartToLocalStorage([]);
    },

    clearAddToCartBackendMessage: (state) => {
      state.addToCartBackendMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addToCartBackend.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCartBackend.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload?.cart?.items;
        state.addToCartBackendMessage = action.payload?.message;
      })
      .addCase(addToCartBackend.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    //   .addCase(deleteCartItemBackend.fulfilled, (state, action) => {
    //     state.cartItems = action.payload;
    //   })
    //   .addCase(clearCartBackend.fulfilled, (state, action) => {
    //     state.cartItems = [];
    //   });
  },
});

export const {
  clearError,
  addToCartLocal,
  updateCartItemLocal,
  removeCartItemLocal,
  clearCartLocal,
  clearAddToCartBackendMessage,
  mergeGuestCart,
} = cartSlice.actions;

export default cartSlice.reducer;
