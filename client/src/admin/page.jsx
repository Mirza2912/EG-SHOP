import { useEffect, useState } from "react";
import AdminSidebar from "../components/admin-sidebar";
import DashboardHeader from "../components/dashboard-header";
import DashboardStats from "../components/dashboard-stats";
import RecentProducts from "../components/recent-products";
import RecentUsers from "../components/recent-users";
import ProductsPage from "./products/page";
import UsersPage from "./users/page";
import SettingsPage from "./settings/page";
import OrdersPage from "./orders/page";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../Store/Auth/AuthSliceReducers";
import { getALlProductsAdmin } from "../Store/Products/ProductSliceReducers";
import { getAllOrdersAdmin } from "../Store/Order/OrderSliceReducer";
import AdminSingleProductDetails from "./products/productDetails/AdminSingleProductDetails";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getALlProductsAdmin());
    dispatch(getAllOrdersAdmin());
  }, [dispatch]);
  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
}
