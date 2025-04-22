import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/AuthSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer, // Add your slices here
  },
});

export default store;
