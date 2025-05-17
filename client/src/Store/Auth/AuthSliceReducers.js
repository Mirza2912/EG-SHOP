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
    // console.log(userData); // Log the user data

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
      console.log(error);

      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to load user's details"
      );
    }
  }
);

//For logout
const userLogOut = createAsyncThunk("user/logOut", async () => {
  // console.log(userData);

  try {
    const response = await axios.get("/api/auth/logout");
    // console.log(response.data); // Log the response data

    return response.data;
  } catch (error) {
    return (
      error.response.data?.errors ||
      error.response.data?.message ||
      error.message ||
      "Failed to logout user"
    );
  }
});

const editUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "/api/auth/users/me/edit-profile",
        userData,
        config
      );

      // console.log(response);

      return response?.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to update user"
      );
    }
  }
);

//for update password
const changeUserPassword = createAsyncThunk(
  "user/changePassword",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "/api/auth/users/me/change-password",
        userData,
        config
      );

      // console.log(response?.data);

      return response?.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to change user's password"
      );
    }
  }
);

//fro user delete permanently
const userDelete = createAsyncThunk(
  "user/userDelete",
  async (_, { rejectWithValue }) => {
    // console.log(imageId);

    try {
      /*making api call with axios for getting user details from backend */
      const response = await axios.delete(
        "/api/auth/users/me/delete-account",
        config
      );

      // console.log(data); //returning fetched data
      return response?.data;
    } catch (error) {
      // console.log(error.response.data.message);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to delete user permanently"
      );
    }
  }
);

//for forgot password
const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, { rejectWithValue }) => {
    // console.log(email);

    try {
      const response = await axios.post(
        "/api/auth/forgot-password",
        { email },
        config
      );

      // console.log(response?.data);

      return response?.data; //returning fetched data
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to forgot user's password"
      );
    }
  }
);

//ADMIN METHODS

// get all users
const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    // console.log(email);

    try {
      const response = await axios.get("/api/auth/users");

      // console.log(response?.data);

      return response?.data?.data; //returning fetched data
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to fetch users"
      );
    }
  }
);

//For User details
const getSingleUserDetails = createAsyncThunk(
  "auth/getSingleUserDetails",
  async (id, { rejectWithValue }) => {
    console.log(id);

    try {
      const response = await axios.get(`/api/auth/user/${id}`);
      // console.log(response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to load user's details"
      );
    }
  }
);

//update user role
const updateUserRole = createAsyncThunk(
  "user/updateUserRole",
  async (data, { rejectWithValue }) => {
    // console.log(data);

    try {
      const response = await axios.put(
        `/api/auth/user/update-role/${data?.id}`,
        data,
        config
      );

      // console.log(response?.data);

      return response?.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to update user's role"
      );
    }
  }
);

//delete user
const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    // console.log(id);

    try {
      const response = await axios.delete(
        `/api/auth/user/delete-account/${id}`,
        config
      );

      // console.log(response?.data);

      return response?.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to delete user"
      );
    }
  }
);

//suspend user
const suspendUser = createAsyncThunk(
  "user/suspendUser",
  async (id, { rejectWithValue }) => {
    // console.log(id);

    try {
      const response = await axios.put(`/api/auth/user/suspend/${id}`, config);

      // console.log(response?.data);

      return response?.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to suspend user"
      );
    }
  }
);

//un-suspend user
const unSuspendUser = createAsyncThunk(
  "user/unSuspendUser",
  async (id, { rejectWithValue }) => {
    // console.log(id);

    try {
      const response = await axios.put(
        `/api/auth/user/un-suspend/${id}`,
        config
      );

      // console.log(response?.data);

      return response?.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(
        error.response.data?.errors ||
          error.response.data?.message ||
          error.message ||
          "Failed to un suspend user"
      );
    }
  }
);

export {
  registerUser,
  userLogin,
  loadUser,
  userLogOut,
  editUserProfile,
  changeUserPassword,
  userDelete,
  forgotPassword,
  getAllUsers,
  getSingleUserDetails,
  updateUserRole,
  deleteUser,
  suspendUser,
  unSuspendUser,
};
