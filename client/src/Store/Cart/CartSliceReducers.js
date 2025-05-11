import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//config for post request
const config = {
  headers: {
    "Content-Type": "application/json", // Telling the server we're sending JSON data
  },
};
//get user cart
const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/cart/");
      // console.log(response?.data?.cart?.items);
      return response?.data?.cart?.items; //returning fetched data
    } catch (error) {
      //   console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to fetch user's cart from server"
      );
    }
  }
);

//add to cart item to direct backend
const addToCartBackend = createAsyncThunk(
  "cart/addToCartBackend",
  async (cartData, { rejectWithValue }) => {
    try {
      // console.log(cartData);

      const response = await axios.post(
        "/api/cart/addToCart",
        cartData,
        config
      );
      //   console.log(response?.data?.cart?.items);
      return response?.data; //returning fetched data
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to create cart of user"
      );
    }
  }
);

//update from backend
const addToCartUpdateBackend = createAsyncThunk(
  "cart/addToCartUpdateBackend",
  async (cartData, { rejectWithValue }) => {
    try {
      // console.log(cartData);

      const response = await axios.put(
        "/api/cart/updateCart",
        cartData,
        config
      );
      // console.log(response?.data);
      return response?.data; //returning fetched data
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to update cart of user"
      );
    }
  }
);

//remove cart item from backend
const deleteCartItemBackend = createAsyncThunk(
  "cart/deleteCartItemBackend",
  async (id, { rejectWithValue }) => {
    try {
      // console.log(id);

      const response = await axios.delete(
        `/api/cart/deleteCartItem/${id}`,
        config
      );
      // console.log(response?.data);
      return response?.data; //returning fetched data
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to remove cart item"
      );
    }
  }
);

// clear whole cart
export const clearWholeCartBackend = createAsyncThunk(
  "cart/clearWholeCArtBackend",
  async (_, { rejectWithValue }) => {
    try {
      // console.log(id);

      const response = await axios.delete(`/api/cart/clearCart`, config);
      console.log(response?.data);
      return response?.data?.data?.cart?.items; //returning fetched data
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to remove cart item"
      );
    }
  }
);
// export const clearCartBackend = createAsyncThunk(
//   "cart/clearCartBackend",
//   async () => {
//     const { data } = await axios.delete("/api/cart");
//     return data;
//   }
// );

export {
  getCart,
  addToCartBackend,
  addToCartUpdateBackend,
  deleteCartItemBackend,
};
