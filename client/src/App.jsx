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
  clearLogoutMessage,
} from "./Store/Auth/AuthSlice.js";
import { toast } from "react-toastify";
import EditUserProfile from "./pages/User/EditUserProfile.jsx";
import ChangeUserPassword from "./pages/User/ChangeUserPassword.jsx";
import NotFoundPage from "./pages/NotFound/NotFoundPage.jsx";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    editProfileMessage,
    logOutMessage,
    changeUserPasswordMessage,
    deleteUserMessage,
  } = useSelector((state) => state.auth);
  // console.log(isAuthenticated);

  // const isFetchedRef = useRef(false);

  useEffect(() => {
    let timeout;

    if (logOutMessage) {
      toast.success(logOutMessage);
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

    return () => clearTimeout(timeout);
  }, [
    logOutMessage,
    editProfileMessage,
    changeUserPasswordMessage,
    deleteUserMessage,
  ]);

  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
