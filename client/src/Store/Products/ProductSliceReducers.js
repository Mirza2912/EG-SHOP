import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//getAllProducts(with filters)
const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (
    {
      category = "",
      minPrice = 0,
      maxPrice = 10000,
      page = 1,
      stock = true,
      keyword = "",
    } = {}, //set default empty object when nothin filtered
    { rejectWithValue }
  ) => {
    try {
      // console.log(minPr);

      const params = new URLSearchParams();

      // console.log(inStock, outStock);

      // Add filters to the query string
      if (keyword) params.append("keyword", keyword);
      if (minPrice !== undefined) params.append("minPrice", minPrice);
      if (maxPrice !== undefined) params.append("maxPrice", maxPrice);
      if (category) params.append("category", category);
      if (page !== undefined) params.append("page", page);
      if (stock) {
        params.append("stock", stock);
      }
      //   console.log("params :" + params.toString());

      /*making api call with axios for getting product from backend */
      const response = await axios.get(`/api/products/`, { params });
      // console.log(response?.data);
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

//single product details
const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  async (id, { rejectWithValue }) => {
    try {
      // console.log(id);

      /*making api call with axios for getting single  product from backend */
      const response = await axios.get(`/api/products/singleProduct/${id}`);
      // console.log(response?.data);
      return response?.data?.product; //returning fetched data
    } catch (error) {
      console.log(error.response.data?.message);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to fetch single product details"
      );
    }
  }
);

//admin
const getALlProductsAdmin = createAsyncThunk(
  "products/getALlProductsAdmin",
  async (_, { rejectWithValue }) => {
    try {
      // console.log(id);

      /*making api call with axios for getting single  product from backend */
      const response = await axios.get(`/api/products/admin/products`);
      // console.log(response?.data);
      return response?.data?.product;
    } catch (error) {
      console.log(error.response.data?.message);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to fetch products"
      );
    }
  }
);

//single product details
const getSingleProductAdmin = createAsyncThunk(
  "products/getSingleProductAdmin",
  async (id, { rejectWithValue }) => {
    try {
      // console.log(id);

      /*making api call with axios for getting single  product from backend */
      const response = await axios.get(`/api/products/singleProduct/${id}`);
      // console.log(response?.data?.product);
      return response?.data?.product; //returning fetched data
    } catch (error) {
      console.log(error.response.data?.message);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to fetch single product details"
      );
    }
  }
);

//single product details
const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      // console.log(id);

      /*making api call with axios for getting single  product from backend */
      const response = await axios.delete(`/api/products//deleteProduct/${id}`);
      // console.log(response?.data);
      return response?.data?.message; //returning fetched data
    } catch (error) {
      console.log(error.response.data?.message);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to delete product"
      );
    }
  }
);

export {
  getAllProducts,
  getSingleProduct,
  getALlProductsAdmin,
  getSingleProductAdmin,
  deleteProduct,
};
