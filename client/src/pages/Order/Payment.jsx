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
import { FaAddressCard } from "react-icons/fa";
import { FcExpired } from "react-icons/fc";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import { useEffect } from "react";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { cartItems } = useSelector((state) => state.cart);

  const { shippingAddress, singleOrderDetails, error } = useSelector(
    (state) => state.order
  );

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
  const itemsPrice = orderItems.reduce((sum, item) => sum + item.price, 0);
  const order = {
    shippingAddress,
    orderItems,
    shippingPrice: orderInfo?.shippingPrice,
    totalPrice: orderInfo?.totalPrice,
    isPaid: true,
    paidAt: new Date(Date.now()).toISOString(),
    itemsPrice,
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
          sessionStorage.removeItem("orderInfo");
          navigate(`/user/orders`);
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
      <p className="text-2xl sm:text-3xl font-semibold text-center mb-6">
        Payment
      </p>
      <div className="max-w-xl lg:max-w-2xl w-full mx-auto bg-white rounded-xl shadow-xl p-6 mb-10">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
            Card Info
          </h2>
          <div className="mb-7 relative">
            <FaAddressCard className="text-xl text-gray-500 absolute top-3 left-2.5 z-10" />

            <CardNumberElement
              className={`w-full relative pl-10 pr-3 py-3 border border-gray-300 rounded-lg outline-none text-gray-800 bg-white peer transition-all duration-200 
            focus:border-gray-300 focus:ring-1 focus:ring-gray-300`}
            />
            <label
              className={`absolute left-10 transition-all duration-200 text-gray-500 bg-white px-1 -top-3 text-sm 
           
          `}
            >
              Card Number
            </label>
          </div>
          <div className="mb-7 relative">
            <FcExpired className="text-xl text-gray-500 absolute top-3 left-2.5 z-10" />

            <CardExpiryElement
              className={`w-full relative pl-10 pr-3 py-3 border border-gray-300 rounded-lg outline-none text-gray-800 bg-white peer transition-all duration-200 
            focus:border-gray-300 focus:ring-1 focus:ring-gray-300`}
            />
            <label
              className={`absolute left-10 transition-all duration-200 text-gray-500 bg-white px-1 -top-3 text-sm 
           
          `}
            >
              Expiry Date
            </label>
          </div>
          <div className="mb-7 relative">
            <FaAddressCard className="text-xl text-gray-500 absolute top-3 left-2.5 z-10" />
            <CardCvcElement
              className={`w-full relative pl-10 pr-3 py-3 border border-gray-300 rounded-lg outline-none text-gray-800 bg-white peer transition-all duration-200 
            focus:border-gray-300 focus:ring-1 focus:ring-gray-300`}
            />
            <label
              className={`absolute left-10 transition-all duration-200 text-gray-500 bg-white px-1 -top-3 text-sm 
           
          `}
            >
              CVC
            </label>
          </div>
          <button
            type="submit"
            ref={payBtn}
            className="w-full py-3 mt-2 text-lg font-medium text-white rounded-lg shadow-md transition duration-300 bg-[#f96822] hover:bg-[#f0824a]"
          >
            Pay - Rs.{orderInfo && orderInfo.totalPrice}
          </button>
        </form>
      </div>
    </>
  );
};

export default Payment;
