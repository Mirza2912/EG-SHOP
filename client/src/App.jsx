import React, { useEffect, useRef } from "react";
import Home from "./pages/Home/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import Shop from "./pages/Shop/Shop";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AboutUs from "./pages/AboutUs/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Login from "./pages/Register/Login";
import Signup from "./pages/Register/Signup.jsx";
import Profile from "./pages/User/Profile.jsx";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRouteForUser.jsx";
import { loadUser } from "./Store/Auth/AuthSliceReducers.js";
import {
  clearChangeUserPasswordMessage,
  clearEditProfileMessage,
  cleareUserDeleteMessage,
  clearForgotPasswordMessage,
  clearLogoutMessage,
  clearUserRegisterationMessage,
} from "./Store/Auth/AuthSlice.js";
import { toast } from "react-toastify";
import EditUserProfile from "./pages/User/EditUserProfile.jsx";
import ChangeUserPassword from "./pages/User/ChangeUserPassword.jsx";
import NotFoundPage from "./pages/NotFound/NotFoundPage.jsx";
import ForgotUserPassword from "./pages/User/ForgotUserPassword.jsx";
import OtpVerification from "./pages/User/OtpVerification.jsx";
import SingleProduct from "./pages/Shop/SingleProduct.jsx";
import { clearSingleProductMessage } from "./Store/Products/ProductSlice.js";
import {
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
} from "./Store/Cart/CartLocalStorageHandle.js";
import { addToCartBackend, getCart } from "./Store/Cart/CartSliceReducers.js";
import {
  clearAddToCartBackendMessage,
  clearCartLocal,
} from "./Store/Cart/CartSlice.js";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    editProfileMessage,
    logOutMessage,
    changeUserPasswordMessage,
    deleteUserMessage,
    forgotPasswordMessage,
    userRegisterMessage,
    isAuthenticated,
  } = useSelector((state) => state.auth);

  // const { singleProductMessage } = useSelector((state) => state.products);
  const { addToCartBackendMessage } = useSelector((state) => state.cart);

  useEffect(() => {
    let timeout;

    if (userRegisterMessage) {
      toast.success(userRegisterMessage);
      timeout = setTimeout(() => {
        navigate("/profile", { replace: true });
        dispatch(clearUserRegisterationMessage());
      }, 1500);
    }

    if (logOutMessage) {
      toast.success(logOutMessage);
      dispatch(clearCartLocal());
      timeout = setTimeout(() => {
        dispatch(clearLogoutMessage());
        navigate("/login", { replace: true });
      }, 1500);
    }

    if (editProfileMessage) {
      toast.success(editProfileMessage);
      timeout = setTimeout(() => {
        dispatch(clearEditProfileMessage());
        navigate("/profile", { replace: true });
      }, 1500);
    }

    if (changeUserPasswordMessage) {
      toast.success(changeUserPasswordMessage);
      timeout = setTimeout(() => {
        dispatch(clearChangeUserPasswordMessage());
        navigate("/profile", { replace: true });
      }, 1500);
    }

    if (deleteUserMessage) {
      toast.success(deleteUserMessage);
      timeout = setTimeout(() => {
        dispatch(cleareUserDeleteMessage());
        navigate("/login", { replace: true });
      }, 1500);
    }

    // if (singleProductMessage) {
    //   timeout = setTimeout(() => {
    //     dispatch(clearSingleProductMessage());
    //   }, 1500);
    // }

    if (addToCartBackendMessage) {
      toast.success(addToCartBackendMessage);
      timeout = setTimeout(() => {
        dispatch(clearAddToCartBackendMessage());
      }, 1500);
    }

    return () => clearTimeout(timeout);
  }, [
    logOutMessage,
    editProfileMessage,
    changeUserPasswordMessage,
    deleteUserMessage,
    userRegisterMessage,
    // singleProductMessage,
    addToCartBackendMessage,
  ]);

  useEffect(() => {
    dispatch(loadUser());

    //if user logged in then get user cart
    if (isAuthenticated !== "") {
      const guestCart = loadCartFromLocalStorage(); //this will be an array
      // console.log(guestCart);

      //if logged in user have alreay select items when loggedout
      if (guestCart?.length > 0) {
        guestCart.forEach((item) => {
          dispatch(
            addToCartBackend({
              productId: item?.productId,
              quantity: item?.quantity,
              price: item?.price,
            })
          );
        });
        saveCartToLocalStorage([]); // Clear Local Cart after sending
      }

      //if user logged in then fetch user cart
      dispatch(getCart());
    }
  }, [isAuthenticated]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/single-product/:id" element={<SingleProduct />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/user/edit-profile" element={<EditUserProfile />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/user/change-password"
            element={<ChangeUserPassword />}
          />
        </Route>
        <Route path="/user/forgot-password" element={<ForgotUserPassword />} />
        <Route path="/user/otp-verification" element={<OtpVerification />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
