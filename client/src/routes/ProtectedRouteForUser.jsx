// src/components/ProtectedRoute.jsx
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && isAuthenticated === "") {
      toast.error("You need to sign in to access the resources");
    }
  }, [isAuthenticated]);

  if (isAuthenticated && isAuthenticated !== "") {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
