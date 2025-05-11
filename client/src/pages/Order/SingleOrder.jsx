import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { getSingleOrderDetails } from "../../Store/Order/OrderSliceReducer";
import { clearError } from "../../Store/Order/OrderSlice";

const SingleOrder = () => {
  const { error, singleOrderDetails } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  const { id } = useParams();
  useEffect(() => {
    dispatch(getSingleOrderDetails(id));
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error]);
  return (
    <>
      <div className="mb-7 mt-14 ">
        <h2 className="lg:text-6xl text-5xl font-bold text-gray-900 text-center mb-3">
          Single Order Details
        </h2>
        <div className="flex items-center justify-center text-gray-900 gap-1 text-md font-normal">
          <Link to={"/"}>Home</Link>
          <span>/</span>
          <Link to={"/user/orders"}>Orders</Link>
          <span>/</span>
          <span>Single order</span>
        </div>
      </div>
      <div className="md:p-8 lg:w-[70vw] mb-10 w-full sm:w-[90vw] md:w-[80vw] p-4 mx-auto bg-bg-color text-gray-900">
        <div className="border border-gray-400 rounded-xl p-5 w-full  backdrop-blur-sm">
          <h3 className="text-2xl font-semibold mb-4 text-gold">Products</h3>

          <div className="space-y-4 w-full">
            {singleOrderDetails?.data?.orderItems?.map((item, idx) => (
              <div
                key={idx}
                className="flex w-full flex-row items-start justify-between border border-gray-400 rounded-md sm:p-4 py-4 pl-4 pr-2"
              >
                <div className="flex gap-2 sm:gap4">
                  <img
                    src={item.image?.url}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h4 className="sm:text-lg font-medium">{item.name}</h4>
                    <p className="text-sm">Quantity: {item.qty}</p>
                  </div>
                </div>
                <div className="">
                  <p className="text-md font-semibold">
                    Rs. {(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-gray-400 pt-5">
            <h3 className="text-2xl font-semibold mb-4 text-gold">Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-md">
              <div>
                <p>
                  <span className="font-medium text-gray-900">Order ID:</span>{" "}
                  {singleOrderDetails.data?._id}
                </p>
                <p>
                  <span className="font-medium text-gray-900">
                    Items Price:
                  </span>{" "}
                  Rs. {singleOrderDetails.data?.itemsPrice?.toFixed(2)}
                </p>
                <p>
                  <span className="font-medium text-gray-900">
                    Shipping Price:
                  </span>{" "}
                  Rs. {singleOrderDetails.data?.shippingPrice?.toFixed(2)}
                </p>
                <p>
                  <span className="font-medium text-gray-900">
                    Total Price:
                  </span>{" "}
                  Rs. {singleOrderDetails.data?.totalPrice?.toFixed(2)}
                </p>
                <p>
                  <span className="font-medium text-gray-900">
                    Payment Method:
                  </span>{" "}
                  {singleOrderDetails.data?.paymentMethod}
                </p>
              </div>
              <div>
                {/* <p className="font-medium text-white">Shipping Address:</p> */}
                <p className="md:flex md:text-sm gap-1 ">
                  <p className="font-semibold text-[1rem] text-gray-900">
                    Shipping Address:
                  </p>
                  {singleOrderDetails.data?.shippingAddress?.address},{" "}
                  {singleOrderDetails.data?.shippingAddress?.city},{" "}
                  {singleOrderDetails.data?.shippingAddress?.country}
                </p>
                <p className="">
                  <span className="font-medium text-gray-900">
                    Order status:
                  </span>{" "}
                  {singleOrderDetails.data?.orderStatus}
                </p>
                <p className="">
                  <span className="font-medium text-gray-900">User name:</span>{" "}
                  {singleOrderDetails.data?.user?.name}
                </p>
                <p className="">
                  <span className="font-medium text-gray-900">User email:</span>{" "}
                  {singleOrderDetails.data?.user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleOrder;
