import { useState } from "react";
import AdminSidebar from "../components/admin-sidebar";
import DashboardHeader from "../components/dashboard-header";
import DashboardStats from "../components/dashboard-stats";
import RecentProducts from "../components/recent-products";
import RecentUsers from "../components/recent-users";
import ProductsPage from "./products/page";
import UsersPage from "./users/page";
import SettingsPage from "./settings/page";

export default function AdminDashboard() {
  const [route, setRoute] = useState("dashboard");
  console.log("route",route);
  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar route={route} setRoute={setRoute} />
        <main className="flex-1 overflow-auto">
          {route == "dashboard" ? (
            <>
              <div className="p-6 space-y-6">
                <DashboardHeader />
                <DashboardStats />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
                    <RecentUsers />
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">
                      Recent Products
                    </h2>
                    <RecentProducts />
                  </div>
                </div>
              </div>
            </>
          ) : route == "products" ? (
            <>
              <ProductsPage />
            </>
          ) : route == "users" ? (
            <>
              <UsersPage />
            </>
          ) :route=="settings"
          ? (
            <>
            <SettingsPage />
            </>
          ):
          (
            ""
          )}
        </main>
      </div>
    </>
  );
}
