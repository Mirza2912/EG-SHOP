import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/AuthSlice.js";
import productReduer from "./Products/ProductSlice.js";
import categoryReducer from "./Category/CategorySlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReduer,
    category: categoryReducer,
  },
});

export default store;
