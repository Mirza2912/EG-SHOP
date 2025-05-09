import React, { useEffect, useMemo, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./routes/ProtectedRouteForUser.jsx";
import { toast } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

/* PAGES IMPORT STATEMENT */
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AboutUs from "./pages/AboutUs/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";
import Cart from "./pages/Cart/Cart";
import NotFoundPage from "./pages/NotFound/NotFoundPage.jsx";

/* USER IMPORT STATEMENT */
import Login from "./pages/Register/Login";
import Signup from "./pages/Register/Signup.jsx";
import Profile from "./pages/User/Profile.jsx";
import {
  clearChangeUserPasswordMessage,
  clearEditProfileMessage,
  clearError,
  cleareUserDeleteMessage,
  clearForgotPasswordMessage,
  clearLogoutMessage,
  clearUserRegisterationMessage,
} from "./Store/Auth/AuthSlice.js";
import { loadUser } from "./Store/Auth/AuthSliceReducers.js";
import EditUserProfile from "./pages/User/EditUserProfile.jsx";
import ChangeUserPassword from "./pages/User/ChangeUserPassword.jsx";
import ForgotUserPassword from "./pages/User/ForgotUserPassword.jsx";
import OtpVerification from "./pages/User/OtpVerification.jsx";

/* PRODUCT IMPORT STATEMENT */
import SingleProduct from "./pages/Shop/SingleProduct.jsx";
import {
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
} from "./Store/Cart/CartLocalStorageHandle.js";

/* CART IMPORT STATEMENT */
import { addToCartBackend, getCart } from "./Store/Cart/CartSliceReducers.js";
import {
  clearAddToCartBackendMessage,
  clearAddToCartUpdateBackendMessage,
  clearCartLocal,
  clearUpdateCartOfLocalMessage,
} from "./Store/Cart/CartSlice.js";
import Checkout from "./pages/Order/Checkout.jsx";
import Shipping from "./pages/Order/Shipping.jsx";
import Payment from "./pages/Order/Payment.jsx";
import { loadShippingFromLocalStorage } from "./Store/Order/OrderLocalStorageHandler.js";
import ConfirmOrder from "./pages/Order/ConfirmOrder.jsx";
import axios from "axios";
import OrderComplete from "./pages/Order/OrderComplete.jsx";

/* APP COMPONENT */
const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stripeApiKey = import.meta.env.VITE_STRIPE_API_KEY;
  // console.log(stripeApiKey);

  const stripePromise = useMemo(() => loadStripe(stripeApiKey), [stripeApiKey]);

  /* USER STATE*/
  const {
    editProfileMessage,
    logOutMessage,
    changeUserPasswordMessage,
    deleteUserMessage,
    forgotPasswordMessage,
    userRegisterMessage,
    isAuthenticated,
    error,
  } = useSelector((state) => state.auth);

  /* CART STATE*/
  const {
    addToCartBackendMessage,
    addToCartUpdateBackendMessage,
    updateCartOfLocalMessage,
    cartItems,
  } = useSelector((state) => state.cart);
  // console.log(cartItems);

  const toastShownRef = useRef(false);

  /* USEEFFCART FOR TOAST AND CLEAR MESSAGES*/
  useEffect(() => {
    let timeout;

    /* FOR USER AUTHENTICATION */

    if (error) {
      // console.log(error);

      if (error === "No token, authorization denied") {
        timeout = setTimeout(() => {
          dispatch(clearError());
        }, 1500);
      } else {
        toast.error(error);
        timeout = setTimeout(() => {
          dispatch(clearError());
        }, 1500);
      }
    }
    //user reagisteration success message show
    if (userRegisterMessage) {
      toast.success(userRegisterMessage);
      navigate("/profile", { replace: true });
      dispatch(clearUserRegisterationMessage());
    }
    //user logout success message show
    if (logOutMessage) {
      // console.log(logOutMessage);
      if (!toastShownRef.current) {
        toast.success(logOutMessage);
        toastShownRef.current = true;
      }

      dispatch(clearCartLocal());
      dispatch(clearLogoutMessage());
      navigate("/");
    }
    //user update profile success message show
    if (editProfileMessage) {
      toast.success(editProfileMessage);
      dispatch(clearEditProfileMessage());
      navigate("/profile", { replace: true });
    }
    //user update password message success message show
    if (changeUserPasswordMessage) {
      toast.success(changeUserPasswordMessage);
      dispatch(clearChangeUserPasswordMessage());
      navigate("/profile", { replace: true });
    }
    //user delete success message show
    if (deleteUserMessage) {
      toast.success(deleteUserMessage);
      timeout = setTimeout(() => {
        dispatch(cleareUserDeleteMessage());
        navigate("/login", { replace: true });
      }, 1500);
    }

    /* FOR USER CART */

    //Add to cart item to backend message -->when user logged in
    if (addToCartBackendMessage) {
      toast.success(addToCartBackendMessage);
      timeout = setTimeout(() => {
        dispatch(clearAddToCartBackendMessage());
      }, 1500);
    }

    //update item of cart to backend message -->when user logged in
    if (addToCartUpdateBackendMessage) {
      toast.success(addToCartUpdateBackendMessage);
      timeout = setTimeout(() => {
        dispatch(clearAddToCartUpdateBackendMessage());
      }, 1500);
    }

    //update item of cart to backend message -->when user is guest
    if (updateCartOfLocalMessage) {
      toast.success(updateCartOfLocalMessage);
      timeout = setTimeout(() => {
        dispatch(clearUpdateCartOfLocalMessage());
      }, 1500);
    }

    return () => clearTimeout(timeout);
  }, [
    logOutMessage,
    editProfileMessage,
    changeUserPasswordMessage,
    deleteUserMessage,
    userRegisterMessage,
    addToCartBackendMessage,
    addToCartUpdateBackendMessage,
    updateCartOfLocalMessage,
    error,
  ]);

  /* USEEFFECT FOR LOGICS*/
  useEffect(() => {
    // console.log(loadShippingFromLocalStorage());

    //AUTOMATICALLY LOAD USER WHEN PAGE RELOAD AFTER LOG IN
    dispatch(loadUser());
    // console.log(loadCartFromLocalStorage());

    /*GET USER CART ITEMS AUTOMATICALLY WHEN APP LOAD AND RELOAD*/
    //get cart if user logged in
    if (isAuthenticated !== "") {
      const guestCart = loadCartFromLocalStorage(); //this will be an array
      console.log(guestCart);

      //if logged in user have alreay select items when loggedout this will be store in backend also
      if (guestCart?.length > 0) {
        guestCart.forEach((item) => {
          dispatch(
            addToCartBackend({
              productId: item?.product,
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/user/edit-profile" element={<EditUserProfile />} />
          <Route
            path="/user/change-password"
            element={<ChangeUserPassword />}
          />
          <Route path="/checkout/*" element={<Checkout />}>
            <Route index element={<Shipping />} />
            <Route
              path="payment"
              element={
                stripeApiKey ? (
                  <Elements stripe={stripePromise}>
                    <Payment />
                  </Elements>
                ) : (
                  <div>Loading Payment...</div>
                )
              }
            />
            <Route path="shipping" element={<Shipping />} />
            <Route path="order-confirm" element={<ConfirmOrder />} />
            <Route path="success" element={<OrderComplete />} />
          </Route>
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
