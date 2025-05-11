import { createSlice } from "@reduxjs/toolkit";
import {
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
} from "./CartLocalStorageHandle";
import {
  addToCartBackend,
  addToCartUpdateBackend,
  clearWholeCartBackend,
  deleteCartItemBackend,
  getCart,
} from "./CartSliceReducers";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getSingleProduct } from "../Products/ProductSliceReducers";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: loadCartFromLocalStorage(), //will be an array
    isLoading: false,
    error: null,
    addToCartBackendMessage: "",
    addToCartUpdateBackendMessage: "",
    updateCartOfLocalMessage: "",
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
    //when user not logged in then user can add item to cart
    addToCartLocal: (state, action) => {
      const itemToAdd = action.payload; //store product item in which product._id store and price and quantity
      // console.log(itemToAdd);

      const existItem = state.cartItems?.find(
        (item) => item.product === itemToAdd.product
      );

      if (existItem) {
        // console.log("Existed item find" + existItem);

        if (existItem.stock > existItem?.quantity + itemToAdd?.quantity) {
          existItem.quantity += itemToAdd.quantity;
        } else {
          existItem.quantity = existItem.stock;
        }
      } else {
        state.cartItems.push(itemToAdd);
      }
      saveCartToLocalStorage(state.cartItems);
    },

    //update cart when user not logged in
    updateCartItemLocal: (state, action) => {
      const { productId, quantity } = action.payload; //user only can update quantity
      // console.log(productId, quantity);
      if (!productId || !quantity) {
        toast.error("productId and quantity required");
        return;
      }

      const itemToUpdate = state.cartItems?.find(
        (item) => item._id === productId
      );

      if (itemToUpdate) {
        state.cartItems?.forEach((item) => {
          if (item._id === itemToUpdate._id) {
            item.quantity = quantity;
            saveCartToLocalStorage(state.cartItems);
            state.updateCartOfLocalMessage = "Cart updated successfully";
          }
        });
      }
    },

    //remove cart item when use not logged in
    removeCartItemLocal: (state, action) => {
      // console.log(action.payload);

      state.cartItems = state.cartItems?.filter(
        (item) => item._id !== action.payload //action.payload will be only productId
      );
      saveCartToLocalStorage(state.cartItems);
    },

    //clear whole cart when user not logged in
    clearCartLocal: (state) => {
      state.cartItems = [];
      saveCartToLocalStorage([]);
    },

    //clear addToCartBackendMessage
    clearAddToCartBackendMessage: (state) => {
      state.addToCartBackendMessage = "";
    },

    //clear addToCartUpdateBackendMessage
    clearAddToCartUpdateBackendMessage: (state) => {
      state.addToCartUpdateBackendMessage = "";
    },

    //clear update cart of local
    clearUpdateCartOfLocalMessage: (state) => {
      state.updateCartOfLocalMessage = "";
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
      })
      .addCase(addToCartUpdateBackend.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCartUpdateBackend.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload?.cart?.items;
        state.addToCartUpdateBackendMessage = action.payload?.message;
      })
      .addCase(addToCartUpdateBackend.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteCartItemBackend.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCartItemBackend.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload?.cart?.items;
      })
      .addCase(deleteCartItemBackend.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(clearWholeCartBackend.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clearWholeCartBackend.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(clearWholeCartBackend.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  addToCartLocal,
  updateCartItemLocal,
  removeCartItemLocal,
  clearCartLocal,
  clearAddToCartBackendMessage,
  clearAddToCartUpdateBackendMessage,
  clearUpdateCartOfLocalMessage,
} = cartSlice.actions;

export default cartSlice.reducer;
