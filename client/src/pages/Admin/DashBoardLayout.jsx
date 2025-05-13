import { useEffect, useState } from "react";

import { Link, NavLink, Outlet } from "react-router-dom";

const DashBoardLayout = () => {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <div className="w-full h-auto relative flex">
      {/* panel  */}
      <div className="lg:w-[300px] hidden lg:block  fixed top-0 h-screen bg-white  p-6">
        {/* Logo */}
        <div className="text-3xl font-bold mb-10 mt-5 text-gray-700 tracking-widest">
          FRESH FINDS
        </div>

        {/* USER Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2 text-gray-700">USER</h2>
          <ul className="space-y-2">
            <li className="group w-fit text-lg ml-2 relative cursor-pointer text-gray-600 hover:text-[#f98662] transition-colors duration-300">
              <NavLink
                to="/admin/dashboard/users"
                className={({ isActive }) =>
                  isActive
                    ? " text-[#f98662] font-semibold"
                    : "text-gray-600 hover:text-[#f98662]"
                }
              >
                All Users
              </NavLink>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#f98662] transition-all duration-300 group-hover:w-full origin-right"></span>
            </li>
          </ul>
        </div>

        {/* PRODUCTS Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2 text-gray-700">PRODUCTS</h2>
          <ul className="space-y-2">
            <li className="group w-fit text-lg ml-2 relative cursor-pointer text-gray-600 hover:text-[#f98662] transition-colors duration-300">
              <NavLink
                to="/admin/dashboard/product/create-new-product"
                className={({ isActive }) =>
                  isActive
                    ? " text-[#f98662] font-semibold"
                    : "text-gray-600 hover:text-[#f98662]"
                }
              >
                Create Product
              </NavLink>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#f98662] transition-all duration-300 group-hover:w-full origin-right"></span>
            </li>
            <li className="group w-fit text-lg ml-2 relative cursor-pointer text-gray-600 hover:text-[#f98662] transition-colors duration-300">
              <NavLink
                to="/admin/dashboard/products"
                className={({ isActive }) =>
                  isActive
                    ? " text-[#f98662] font-semibold"
                    : "text-gray-600 hover:text-[#f98662]"
                }
              >
                All Products
              </NavLink>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#f98662] transition-all duration-300 group-hover:w-full origin-right"></span>
            </li>
          </ul>
        </div>

        {/* ORDERS Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2 text-gray-700">ORDERS</h2>
          <ul className="space-y-2">
            <li className="group w-fit text-lg ml-2 relative cursor-pointer text-gray-600 hover:text-[#f98662] transition-colors duration-300">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? " text-[#f98662] font-semibold"
                    : "text-gray-600 hover:text-[#f98662]"
                }
              >
                All Orders
              </NavLink>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#f98662] transition-all duration-300 group-hover:w-full origin-right"></span>
            </li>
          </ul>
        </div>
      </div>

      {/* main  */}
      <div className="w-full lg:w-[calc(100%-300px)] lg:ml-[300px] bg-[#F0F2F5] pt-5 pb-10">
        <Outlet />
      </div>
    </div>
  );
};
export default DashBoardLayout;
