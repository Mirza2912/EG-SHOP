import { createSlice } from "@reduxjs/toolkit";
import {
  changeUserPassword,
  editUserProfile,
  forgotPassword,
  loadUser,
  registerUser,
  userDelete,
  userLogin,
  userLogOut,
} from "./AuthSliceReducers";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
    userRegisterMessage: "",
    isAuthenticated: "",
    logOutMessage: "",
    editProfileMessage: "",
    changeUserPasswordMessage: "",
    deleteUserMessage: "",
    forgotPasswordMessage: "",
  },
  reducers: {
    clearUserRegisterationMessage: (state) => {
      state.userRegisterMessage = "";
    },
    clearError: (state) => {
      state.error = null;
    },
    clearLogoutMessage: (state) => {
      state.logOutMessage = "";
    },
    clearEditProfileMessage: (state) => {
      state.editProfileMessage = "";
    },
    clearChangeUserPasswordMessage: (state) => {
      state.changeUserPasswordMessage = "";
    },
    cleareUserDeleteMessage: (state) => {
      state.deleteUserMessage = "";
    },
    clearForgotPasswordMessage: (state) => {
      state.forgotPasswordMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.userRegisterMessage = action.payload.message;
        state.isAuthenticated = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = action.payload.message;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = action.payload.message;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(userLogOut.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = "";
        state.logOutMessage = action.payload.message;
      })
      .addCase(userLogOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.editProfileMessage = action.payload?.message;
      })
      .addCase(editUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(changeUserPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changeUserPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.changeUserPasswordMessage = action.payload?.message;
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(userDelete.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = "";
        state.deleteUserMessage = action.payload?.message;
      })
      .addCase(userDelete.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.forgotPasswordMessage = action.payload?.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearUserRegisterationMessage,
  clearError,
  clearLogoutMessage,
  clearEditProfileMessage,
  clearChangeUserPasswordMessage,
  cleareUserDeleteMessage,
  clearForgotPasswordMessage,
} = authSlice.actions;

export default authSlice.reducer;
