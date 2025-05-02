import { useNavigate } from "react-router-dom";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { createOrder } from "../../Store/Order/OrderSliceReducer";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { cartItems } = useSelector((state) => state.cart);

  const { shippingAddress } = useSelector((state) => state.order);
  // console.log(shippingAddress);

  const { user } = useSelector((state) => state.auth);

  const paymentData = {
    amount: Math.round(orderInfo?.totalPrice * 100),
  };

  // const [orderItems, setOrderItems] = useState([]);

  const orderItems = useMemo(() => {
    return cartItems.map((item) => ({
      product: item?.product?._id,
      name: item?.product?.name,
      qty: item?.quantity,
      price: item?.price,
      image: {
        public_id: item?.product?.images[0]?.public_id,
        url: item?.product?.images[0]?.url,
      },
    }));
  }, [cartItems]);

  // console.log(orderItems);
  // console.log(cartItems);

  const order = {
    shippingAddress,
    orderItems,
    shippingPrice: orderInfo?.shippingPrice,
    totalPrice: orderInfo?.totalPrice,
    isPaid: true,
    paidAt: new Date(Date.now()).toISOString(),
  };

  const handleSubmit = async (e) => {
    // console.log("start");

    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      // console.log("start try");

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // console.log("start");

      // console.log("paymentData : " + paymentData.amount);

      const { data } = await axios.post(
        "/api/payment/processPayment",
        paymentData,
        config
      );
      // console.log(data);

      const client_secret = data?.client_secret;

      // console.log("here stripe : " + stripe);
      // console.log("here stripe : " + elements);

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user?.user?.name,
            email: user?.user?.email,
            address: {
              line1: shippingAddress?.address,
              city: shippingAddress?.city,
              state: shippingAddress?.state,
              postal_code: shippingAddress?.postalCode,
              country: "PK",
            },
          },
        },
      });
      // console.log(result);

      if (result.error) {
        payBtn.current.disabled = false;
        // console.log(result.error);

        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          // console.log("Payment successful", +result.paymentIntent.status);

          order.paymentResult = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          // console.log(result.paymentIntent.id, result.paymentIntent.status);

          dispatch(createOrder(order));

          toast.success("Order Placed Successfully");
          sessionStorage.removeItem("orderInfo");
          navigate("/checkout/success", { replace: true });
        } else {
          toast.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      console.log(error);

      payBtn.current.disabled = false;
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center py-6 ">
        <div>
          <form
            className="w-[100%]  bg-white shadow-md rounded-lg p-6"
            onSubmit={(e) => handleSubmit(e)}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Card Info
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Card Number
              </label>
              <CardNumberElement className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Expiry Date
              </label>
              <CardExpiryElement className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                CVC
              </label>
              <CardCvcElement className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button
              type="submit"
              ref={payBtn}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50"
            >
              Pay - Rs.{orderInfo && orderInfo.totalPrice}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
