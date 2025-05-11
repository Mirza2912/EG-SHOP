import { createSlice } from "@reduxjs/toolkit";
import {
  loadOrderItemsFromLocalStorage,
  loadShippingFromLocalStorage,
  saveOrderItemsToLocalStorage,
  saveShippingToLocalStorage,
} from "./OrderLocalStorageHandler";
import {
  createOrder,
  getAllOrders,
  getSingleOrderDetails,
} from "./OrderSliceReducer";

// Product slice
const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
    singleOrderDetails: {},
    shippingAddress: loadShippingFromLocalStorage(),
    orderItems: loadOrderItemsFromLocalStorage(),
    paymentMethod: "",
    orderPlacedMessage: "",
    getAllOrdersMessage: "",
    otherDetails: { taxPrice: null, shippingPrice: null, totalPrice: null },
    isLoading: false,
    error: null,
  },
  reducers: {
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      saveShippingToLocalStorage(action.payload);
    },
    clearShippingAddress: (state) => {
      saveShippingToLocalStorage(null);
      state.shippingAddress = null;
    },

    setOrderItems: (state, action) => {
      state.orderItems = action.payload; //will be an array
      saveOrderItemsToLocalStorage(action.payload);
    },
    clearOrderItems: (state) => {
      saveOrderItemsToLocalStorage([]);
      state.orderItems = [];
    },

    clearGetAllOrdersMessage: (state) => {
      state.getAllOrdersMessage = "";
    },

    clearOrderPlaceMessage: (state) => {
      state.orderPlacedMessage = "";
    },

    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleOrderDetails = action.payload;
        state.orderPlacedMessage = action.payload?.message;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload?.data;
        state.getAllOrdersMessage = action.payload?.message;
        state.error = null;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getSingleOrderDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSingleOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleOrderDetails = action.payload;
        state.error = null;
      })
      .addCase(getSingleOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  setShippingAddress,
  setOrderItems,
  clearOrderItems,
  clearOrderPlaceMessage,
  clearGetAllOrdersMessage,
  clearShippingAddress,
} = orderSlice.actions;
export default orderSlice.reducer;
