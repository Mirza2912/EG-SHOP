import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearError } from "../Store/Auth/AuthSlice";

const AdminRoute = () => {
  const { user, isAuthenticated, error } = useSelector((state) => state.auth);
  const [unauthorized, setUnauthorized] = useState(false);
  const hasShownToast = useRef(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // if (error && error === "No token, authorization denied") {
    //   navigate("/");
    //   dispatch(clearError());
    // }
    if (user && user.user?.role !== "admin") {
      if (!hasShownToast.current) {
        toast.error("Admin route only accessed by admin...!");
        hasShownToast.current = true; // ✅ ensures toast is shown only once
        setUnauthorized(true);
      }
    }
  }, [user, error]);

  if (user && user.user?.role === "admin") {
    return <Outlet />;
  }
};

export default AdminRoute;
