import React from "react";
import DashboardHeader from "../components/dashboard-header";
import DashboardStats from "../components/dashboard-stats";
import RecentUsers from "../components/recent-users";
import RecentProducts from "../components/recent-products";

const AdminDashboardMain = () => {
  return (
    <div className="p-6 space-y-6">
      <DashboardHeader />
      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
          <RecentUsers />
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recent Products</h2>
          <RecentProducts />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardMain;
