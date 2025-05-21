import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader/Loader";
import {
  deleteOrderAdmin,
  getAllOrdersAdmin,
  getSingleOrderDetails,
} from "../Store/Order/OrderSliceReducer";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const OrdersTable = ({ orders }) => {
  const { isLoading, allOrders } = useSelector((state) => state.order);

  const [dropdownOpen, setDropdownOpen] = useState(null);

  const navigate = useNavigate();
  const disptach = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;

  const paginatedOrders = orders?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(allOrders && allOrders?.length / ordersPerPage);

  const toggleDropdown = (userId) => {
    if (dropdownOpen === userId) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(userId);
    }
  };

  useEffect(() => {
    disptach(getAllOrdersAdmin());
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-gray-500 border-b">
                  <th className="font-medium text-left pb-3 pl-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                  </th>
                  <th className="font-medium text-left pb-3">User</th>
                  <th className="font-medium text-left pb-3">Items</th>
                  <th className="font-medium text-left pb-3">Total</th>
                  <th className="font-medium text-left pb-3">Status</th>
                  <th className="font-medium text-right pb-3 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders &&
                  paginatedOrders?.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b last:border-0 hover:bg-gray-50"
                    >
                      <td className="py-3 pl-4">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                        />
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                            {order.user?.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {order.user?.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {order.user?.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="text-sm">
                          {order.orderItems?.length}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="text-sm text-gray-500">
                          Rs.{order.totalPrice}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="text-sm text-gray-500">
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="py-3 text-right pr-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              navigate(
                                `/admin/dashboard/orders/single-order/${order._id}`
                              );
                            }}
                            className="p-1 rounded-md hover:bg-gray-100 text-orange-500"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            <Link className="sr-only">Edit</Link>
                          </button>
                          <button
                            onClick={() =>
                              disptach(deleteOrderAdmin(order?._id))
                            }
                            className="p-1 rounded-md hover:bg-gray-100 text-red-500"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              <line x1="10" y1="11" x2="10" y2="17" />
                              <line x1="14" y1="11" x2="14" y2="17" />
                            </svg>
                            <span className="sr-only">Delete</span>
                          </button>
                          <div className="relative">
                            <button
                              onClick={() => toggleDropdown(order._id)}
                              className="p-1 rounded-md hover:bg-gray-100"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-500"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="19" cy="12" r="1" />
                                <circle cx="5" cy="12" r="1" />
                              </svg>
                              <span className="sr-only">More options</span>
                            </button>
                            {dropdownOpen === order._id && (
                              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                <div
                                  className="py-1"
                                  role="menu"
                                  aria-orientation="vertical"
                                >
                                  <button
                                    onClick={() => {
                                      navigate(
                                        `/admin/dashboard/orders/single-order/${order._id}`
                                      );
                                    }}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    role="menuitem"
                                  >
                                    View order
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {paginatedUsers.length} of {allUsers.length} users
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 text-sm border border-gray-300 rounded-md ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-50"
                }`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 text-sm border border-gray-300 rounded-md ${
                      currentPage === page
                        ? "bg-orange-50 text-orange-500"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-3 py-1 text-sm border border-gray-300 rounded-md ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "hover:bg-gray-50"
                }`}
              >
                Next
              </button>
            </div>
          </div> */}
        </div>
      )}
    </>
  );
};

export default OrdersTable;
