import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/AuthSlice.js";
import productReduer from "./Products/ProductSlice.js";
import categoryReducer from "./Category/CategorySlice.js";
import cartReducer from "./Cart/CartSlice.js";
import orderReducer from "./Order/OrderSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReduer,
    category: categoryReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export default store;
