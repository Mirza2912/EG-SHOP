import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//config for post request
const config = {
  headers: {
    "Content-Type": "application/json", // Telling the server we're sending JSON data
  },
};

const createOrder = createAsyncThunk(
  "order/createOrder",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/orders/create`, data, config);
      //   console.log(response?.data);
      return response?.data; //returning fetched data
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to fetch all products"
      );
    }
  }
);

const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      //   console.log(data);

      const response = await axios.get("/api/orders/myorders");
      // console.log(response?.data);
      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to getting orders"
      );
    }
  }
);

const getSingleOrderDetails = createAsyncThunk(
  "order/getSingleOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      // console.log(id);

      const response = await axios.get(`/api/orders/${id}`);
      // console.log(response?.data);
      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to fetch order"
      );
    }
  }
);

const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/orders/update/${data?.id}`, data);
      // console.log(response?.data);
      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to update order"
      );
    }
  }
);

//admin
const getAllOrdersAdmin = createAsyncThunk(
  "order/getAllOrdersAdmin",
  async (_, { rejectWithValue }) => {
    try {
      //   console.log(data);

      const response = await axios.get("/api/orders/");
      // console.log(response?.data);?
      return response?.data?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to getting orders"
      );
    }
  }
);
//admin
const getSingleOrderDetailsAdmin = createAsyncThunk(
  "order/getSingleOrderDetailsAdmin",
  async (id, { rejectWithValue }) => {
    try {
      // console.log(id);

      const response = await axios.get(`/api/orders/single-order/admin/${id}`);
      // console.log(response?.data);
      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to fetch order"
      );
    }
  }
);

const deleteOrderAdmin = createAsyncThunk(
  "order/deleteOrderAdmin",
  async (id, { rejectWithValue }) => {
    try {
      // console.log(id);

      const response = await axios.delete(
        `/api/orders/single-order/delete/${id}`
      );
      // console.log(response?.data);
      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to delete order"
      );
    }
  }
);
export {
  createOrder,
  getAllOrders,
  getSingleOrderDetails,
  getAllOrdersAdmin,
  updateOrderStatus,
  getSingleOrderDetailsAdmin,
  deleteOrderAdmin,
};
