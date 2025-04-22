import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//config for post request
const config = {
  headers: {
    "Content-Type": "application/json", // Telling the server we're sending JSON data
  },
};

// Async thunk for registering a user
const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    console.log(userData); // Log the user data

    try {
      const response = await axios.post("/api/auth/signup", userData, config);
      // console.log(response.data); // Log the response data

      return response.data;
    } catch (error) {
      // console.log(error); // Log the error

      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Registration failed"
      );
    }
  }
);

//For login
const userLogin = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    // console.log(userData);

    try {
      const response = await axios.post("/api/auth/login", userData, config);
      // console.log(data);

      return response.data;
    } catch (error) {
      // console.log(error.response.data?.errors); // Log the error

      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Login failed"
      );
    }
  }
);

//For User details
const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { rejectWithValue }) => {
    // console.log(userData);

    try {
      const response = await axios.get("/api/auth/user/profile");
      // console.log(response.data);

      return response.data;
    } catch (error) {
      // console.log(error.response.data?.errors); // Log the error
      // console.log(error.response.data?.message); // Log the error
      // console.log(error.message); // Log the error

      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to load user's details"
      );
    }
  }
);

export { registerUser, userLogin, loadUser };
