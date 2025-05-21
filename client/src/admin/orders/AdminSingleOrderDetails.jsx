import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getSingleOrderDetails,
  getSingleOrderDetailsAdmin,
  updateOrderStatus,
} from "../../Store/Order/OrderSliceReducer";
import Loader from "../../components/Loader/Loader";

const AdminSingleOrderDetails = () => {
  const { id } = useParams();

  const { singleOrderAdmin, isLoading } = useSelector((state) => state.order);
  // console.log(singleOrderAdmin && singleOrderAdmin?.data?.orderStatus);

  const dispatch = useDispatch();
  const [statusDropdown, setStatusDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
    setStatusDropdown(false);

    const data = {
      id,
      status: newStatus,
    };
    dispatch(updateOrderStatus(data));
  };

  useEffect(() => {
    if (singleOrderAdmin?.data?.orderStatus) {
      setSelectedStatus(singleOrderAdmin.data.orderStatus);
    }
  }, [singleOrderAdmin]);
  useEffect(() => {
    dispatch(getSingleOrderDetailsAdmin(id));
  }, [dispatch]);
  // const order = singleOrderDetails && singleOrderDetails?.data;
  // console.log(order);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="lg:w-2/3 w-full sm:w-[85%] sm:mx-auto mx-6 my-10 bg-white rounded-2xl shadow-lg p-6 sm:p-10 text-gray-900">
          {/* Title */}
          <div className="mb-10">
            <h2 className="lg:text-6xl text-5xl font-bold text-center mb-2">
              Order Details
            </h2>
            <p className="text-center text-gray-500 text-base">
              Placed on :{" "}
              {new Date(
                singleOrderAdmin && singleOrderAdmin?.data?.createdAt
              ).toLocaleString()}
            </p>
            {singleOrderAdmin?.data?.updatedAt &&
              singleOrderAdmin?.data?.createdAt !==
                singleOrderAdmin?.data?.updatedAt && (
                <p className="text-center text-gray-500 text-base">
                  Last Updated At:{" "}
                  {new Date(singleOrderAdmin?.data?.updatedAt).toLocaleString()}
                </p>
              )}
          </div>

          {/* Section: User Info & Status */}
          <div className="mb-8 border-b pb-5">
            <h3 className="text-2xl font-semibold mb-4 text-gold">
              Customer Info
            </h3>
            <div className="space-y-2 text-lg">
              <p>
                <strong>Name:</strong>{" "}
                {singleOrderAdmin && singleOrderAdmin?.data?.user?.name}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {singleOrderAdmin && singleOrderAdmin?.data?.user?.email}
              </p>
              <p>
                <strong>Payment Method:</strong>{" "}
                {singleOrderAdmin && singleOrderAdmin?.data?.paymentMethod}
              </p>
              <p>
                <strong>Payment Status:</strong>{" "}
                {singleOrderAdmin && singleOrderAdmin?.data?.isPaid
                  ? "Paid ✅"
                  : "Not Paid ❌"}
              </p>
            </div>

            <div className="relative mt-4">
              <div
                onClick={() => setStatusDropdown(!statusDropdown)}
                className="flex items-center gap-3 text-lg cursor-pointer"
              >
                <strong>Order Status:</strong>{" "}
                <span className="text-orange-600">{selectedStatus}</span>
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {statusDropdown && (
                <div className="absolute z-10 mt-2 bg-white border rounded shadow-lg w-40 text-sm">
                  {["Pending", "Processing", "Delivered"].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Section: Shipping Info */}
          <div className="mb-8 border-b pb-5">
            <h3 className="text-2xl font-semibold mb-4 text-gold">
              Shipping Address
            </h3>
            <p className="text-lg">
              {singleOrderAdmin &&
                singleOrderAdmin?.data?.shippingAddress.address}
              ,{" "}
              {singleOrderAdmin && singleOrderAdmin?.data?.shippingAddress.city}
              ,{" "}
              {singleOrderAdmin &&
                singleOrderAdmin?.data?.shippingAddress.state}
              ,{" "}
              {singleOrderAdmin &&
                singleOrderAdmin?.data?.shippingAddress.country}
              ,{" "}
              {singleOrderAdmin &&
                singleOrderAdmin?.data?.shippingAddress.postalCode}
            </p>
          </div>

          {/* Section: Order Items */}
          <div className="mb-8 border-b pb-5">
            <h3 className="text-2xl font-semibold mb-4 text-gold">
              Order Items
            </h3>
            <div className="space-y-4">
              {singleOrderAdmin &&
                singleOrderAdmin?.data?.orderItems?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border border-gray-300 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image?.url}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h4 className="text-lg font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                      </div>
                    </div>
                    <p className="text-md font-semibold">
                      Rs. {(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* Section: Pricing Summary */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gold">
              Pricing Summary
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
              <p>
                <strong>Items Price:</strong> Rs.{" "}
                {singleOrderAdmin &&
                  singleOrderAdmin?.data?.itemsPrice?.toFixed(2)}
              </p>
              <p>
                <strong>Shipping Price:</strong> Rs.{" "}
                {singleOrderAdmin &&
                  singleOrderAdmin?.data?.shippingPrice?.toFixed(2)}
              </p>
              <p>
                <strong>Tax:</strong> Rs.{" "}
                {singleOrderAdmin &&
                  singleOrderAdmin?.data?.taxPrice?.toFixed(2)}
              </p>
              <p>
                <strong>Total Price:</strong>{" "}
                <span className="text-orange-600 font-semibold">
                  Rs.{" "}
                  {singleOrderAdmin &&
                    singleOrderAdmin?.data?.totalPrice?.toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSingleOrderDetails;
