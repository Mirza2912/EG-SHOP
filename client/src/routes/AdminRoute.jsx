import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminRoute = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [unauthorized, setUnauthorized] = useState(false);
  const hasShownToast = useRef(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.user?.role !== "admin") {
      if (!hasShownToast.current) {
        toast.error("Admin route only accessed by admin...!");
        hasShownToast.current = true; // ✅ ensures toast is shown only once
        setUnauthorized(true);
      }
    }
  }, [user]);

  if (user && user.user?.role === "admin") {
    return <Outlet />;
  }
};

export default AdminRoute;
