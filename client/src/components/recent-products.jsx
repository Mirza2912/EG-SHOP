"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../Store/Products/ProductSliceReducers";

export default function RecentProducts() {
  const { adminProducts } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const firstFiveOrders = adminProducts && adminProducts?.slice(0, 5);

  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (productId) => {
    if (dropdownOpen === productId) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(productId);
    }
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-500 border-b">
              <th className="font-medium text-left pb-3">Product</th>
              <th className="font-medium text-left pb-3">Price</th>
              <th className="font-medium text-left pb-3">Stock</th>
              <th className="font-medium text-right pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {firstFiveOrders &&
              firstFiveOrders?.map((product) => (
                <tr key={product._id} className="border-b last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                        {product.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-gray-500">
                          {product.category?.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="text-sm font-medium">
                      ${product.price}
                    </span>
                  </td>
                  <td className="py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.stock > 0
                          ? "bg-green-100 text-green-800"
                          : product.stock === 0
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.stock > 0 ? "InStock" : "OutStock"}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(product._id)}
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
                        <span className="sr-only">Open menu</span>
                      </button>
                      {dropdownOpen === product._id && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                          <div
                            className="py-1"
                            role="menu"
                            aria-orientation="vertical"
                          >
                            <Link
                              to={`/admin/products/single-product/${product._id}`}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              role="menuitem"
                            >
                              View details
                            </Link>
                            <button
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                              role="menuitem"
                            >
                              Edit product
                            </button>
                            <button
                              onClick={() =>
                                dispatch(deleteProduct(product._id))
                              }
                              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                              role="menuitem"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center">
        <Link
          to={"/admin/products"}
          className="border border-gray-300 text-orange-500 px-4 py-2 rounded-md text-sm hover:bg-gray-50"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
}
