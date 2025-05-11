import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const navigate = useNavigate();

  const [subTotal, setSubTotal] = useState(0);
  const [shipping, setShipping] = useState(0);

  const { cartItems } = useSelector((state) => state.cart);

  const { shippingAddress } = useSelector((state) => state.order);

  const { user } = useSelector((state) => state.auth);

  const handleProceedToPayment = () => {
    const data = {
      shippingPrice: shipping,
      totalPrice: subTotal + shipping,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/checkout/payment");
  };

  useEffect(() => {
    const total = cartItems?.reduce((acc, item) => {
      const price = item?.product?.price || 0;
      const discount = item?.product?.discount || 0;
      const quantity = item?.quantity || 0;

      return acc + quantity * (price - discount);
    }, 0);

    setSubTotal(total);
    setShipping(total > 5000 ? 0 : 200);
  }, [cartItems]);
  return (
    <>
      <p className="text-2xl sm:text-3xl font-semibold text-center mb-6">
        Confirm Order
      </p>
      <div className="flex flex-wrap  gap-6 p-4 w-[100%]">
        {/* Left Section */}
        <div className="flex-1  space-y-6">
          {/* Shipping Info Section */}
          <div className="bg-white text-gray-800 p-3 sm:p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold mb-4">Shipping Info</h2>
              <Link
                to={"/checkout/shipping"}
                className=" ease-in duration-100 rounded bg-[#f98622]  hover:bg-[#9f522bf8] text-white py-1 px-2"
              >
                Edit
              </Link>
            </div>
            <p>
              <strong>Name:</strong> {shippingAddress?.name || ""}
            </p>
            <p>
              <strong>Address:</strong>{" "}
              {shippingAddress?.address +
                "," +
                shippingAddress?.city +
                "," +
                shippingAddress?.state +
                "," +
                shippingAddress?.country || ""}
            </p>
            <p className="mb-4">
              <strong>Phone:</strong> {user?.user?.phone || ""}
            </p>
          </div>

          {/* Cart Items Section */}
          <div className="bg-white text-gray-800 p-3 sm:p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold mb-4">Cart items</h2>
              <Link
                to={"/cart"}
                className=" ease-in duration-100 rounded bg-[#f98622]  hover:bg-[#9f522bf8] text-white py-1 px-2"
              >
                Edit
              </Link>
            </div>
            {cartItems?.map((item) => (
              <div key={item._id} className="flex justify-between mb-4">
                <div className="flex items-center">
                  <img
                    src={item.product?.images[0]?.url || ""}
                    alt={item.product?.images[0]?.public_id || ""}
                    className="w-12 h-12 rounded-md mr-4"
                  />
                  <div>
                    <p className="font-medium">{item.product?.name}</p>
                    <p className="ml-auto text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600">
                    Rs.{item.product?.price} x {item.quantity}
                  </p>
                  <p className="text-gray-600">
                    Rs.{item.product?.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 min-w-[300px]">
          {/* Order Summary Section */}
          <div className="bg-white text-gray-800 p-3 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <p className="mb-2">
              <strong>Subtotal:</strong> Rs.{subTotal}
            </p>
            <p className="mb-2">
              <strong>Shipping Charges:</strong> Rs.{shipping}
            </p>
            <p className="mb-4">
              <strong>Total:</strong> Rs.{subTotal + shipping}
            </p>
            <button
              onClick={handleProceedToPayment}
              className="bg-[#f98622] text-white py-2 px-4 rounded-md hover:bg-[#9f522bf8] transition"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
