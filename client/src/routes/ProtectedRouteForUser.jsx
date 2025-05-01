// src/components/ProtectedRoute.jsx
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const location = useLocation();
  // console.log(location);

  if (isAuthenticated && isAuthenticated !== "") {
    return <Outlet />;
  } else {
    // toast.error("You need to sign in to access the resources");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default ProtectedRoute;
