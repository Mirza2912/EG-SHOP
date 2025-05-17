import { createSlice } from "@reduxjs/toolkit";
import {
  changeUserPassword,
  deleteUser,
  editUserProfile,
  forgotPassword,
  getAllUsers,
  getSingleUserDetails,
  loadUser,
  registerUser,
  suspendUser,
  unSuspendUser,
  updateUserRole,
  userDelete,
  userLogin,
  userLogOut,
} from "./AuthSliceReducers";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    allUsers: [],
    singleUserDetails: {},
    isLoading: false,
    error: null,
    userRegisterMessage: "",
    isAuthenticated: "",
    logOutMessage: "",
    editProfileMessage: "",
    changeUserPasswordMessage: "",
    deleteUserMessage: "",
    forgotPasswordMessage: "",
    singleUserDetailsMessage: "",
    updateUserRoleMessage: "",
    adminDeleteUserMessage: "",
    suspendUserMessage: "",
    unSuspendUserMessage: "",
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
    clearSingleUserDetailsMessage: (state) => {
      state.singleUserDetailsMessage = "";
    },
    clearUpdateUserRoleMessage: (state) => {
      state.updateUserRoleMessage = "";
    },
    clearAdminDeleteUserMessage: (state) => {
      state.adminDeleteUserMessage = "";
    },
    clearSuspendUserMessage: (state) => {
      state.suspendUserMessage = "";
    },
    clearUnSuspendUserMessage: (state) => {
      state.unSuspendUserMessage = "";
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
        state.isAuthenticated = action.payload?.message;
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
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getSingleUserDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSingleUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleUserDetails = action.payload;
        state.singleUserDetailsMessage = action.payload?.message;
      })
      .addCase(getSingleUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUserRole.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleUserDetails = action.payload;
        state.updateUserRoleMessage = action.payload?.message;
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminDeleteUserMessage = action.payload?.message;
        const deletedUserId = action.meta.arg;
        state.allUsers = state.allUsers?.filter(
          (user) => user._id !== deletedUserId
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(suspendUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suspendUserMessage = action.payload?.message;
        const updatedUser = action.payload?.user;
        state.allUsers = state.allUsers.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        );
      })
      .addCase(suspendUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(unSuspendUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.unSuspendUserMessage = action.payload?.message;
        const updatedUser = action.payload?.user;
        state.allUsers = state.allUsers.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        );
      })
      .addCase(unSuspendUser.rejected, (state, action) => {
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
  clearSingleUserDetailsMessage,
  clearUpdateUserRoleMessage,
  clearAdminDeleteUserMessage,
  clearSuspendUserMessage,
  clearUnSuspendUserMessage,
} = authSlice.actions;

export default authSlice.reducer;
