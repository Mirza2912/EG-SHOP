import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json", // Telling the server we're sending JSON data
  },
};
//getAllProducts(with filters)
const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      /*making api call with axios for getting product from backend */
      const response = await axios.get(`/api/categories/`);
      //   console.log(response.data);
      return response?.data; //returning fetched data
    } catch (error) {
      //   console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to fetch all categories"
      );
    }
  }
);

const createNewCategory = createAsyncThunk(
  "category/createNewCategory",
  async (data, { rejectWithValue }) => {
    try {
      /*making api call with axios for getting product from backend */
      const response = await axios.post(`/api/categories/create`, data, config);
      console.log(response.data);
      return response?.data; //returning fetched data
    } catch (error) {
      //   console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to fetch all categories"
      );
    }
  }
);

export { getAllCategories, createNewCategory };
