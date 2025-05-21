import { createSlice } from "@reduxjs/toolkit";
import {
  loadOrderItemsFromLocalStorage,
  loadShippingFromLocalStorage,
  saveOrderItemsToLocalStorage,
  saveShippingToLocalStorage,
} from "./OrderLocalStorageHandler";
import {
  createOrder,
  deleteOrderAdmin,
  getAllOrders,
  getAllOrdersAdmin,
  getSingleOrderDetails,
  getSingleOrderDetailsAdmin,
  updateOrderStatus,
} from "./OrderSliceReducer";

// Product slice
const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
    allOrders: [],
    singleOrderDetails: {},
    singleOrderAdmin: {},
    shippingAddress: loadShippingFromLocalStorage(),
    orderItems: loadOrderItemsFromLocalStorage(),
    paymentMethod: "",
    orderPlacedMessage: "",
    getAllOrdersMessage: "",
    updateOrderStatusMessage: "",
    deleteOrderAdminMessage: "",
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

    clearUpdateOrderStatusMessage: (state) => {
      state.updateOrderStatusMessage = "";
    },

    clearDeleteOrderAdminMessage: (state) => {
      state.deleteOrderAdminMessage = "";
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
      })
      .addCase(getAllOrdersAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllOrdersAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allOrders = action.payload;
        state.error = null;
      })
      .addCase(getAllOrdersAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getSingleOrderDetailsAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSingleOrderDetailsAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleOrderAdmin = action.payload;
        state.error = null;
      })
      .addCase(getSingleOrderDetailsAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleOrderAdmin = action.payload;
        state.updateOrderStatusMessage = action.payload?.message;
        state.error = null;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteOrderAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteOrderAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        const deleteOrderId = action.meta.arg;
        state.allOrders = state.allOrders?.filter(
          (order) => order._id !== deleteOrderId
        );
        state.deleteOrderAdminMessage = action.payload?.message;
        state.error = null;
      })
      .addCase(deleteOrderAdmin.rejected, (state, action) => {
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
  clearUpdateOrderStatusMessage,
  clearDeleteOrderAdminMessage,
} = orderSlice.actions;
export default orderSlice.reducer;
