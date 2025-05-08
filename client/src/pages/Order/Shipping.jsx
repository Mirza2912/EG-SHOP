// src/pages/Shipping.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import innerBannr from "../../assets/inner-banner.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setShippingAddress } from "../../Store/Order/OrderSlice";
import { Country, State, City } from "country-state-city";
import { loadShippingFromLocalStorage } from "../../Store/Order/OrderLocalStorageHandler";
import FloatingInput from "../../components/FloatingInput/FloatingInput";
import { FaAddressBook, FaCity } from "react-icons/fa";
import { CiBarcode } from "react-icons/ci";
import LoadingButton from "../../components/LoadingButton/LoadingButton";

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isFocused, setIsFocused] = useState(false);

  // console.log(City.getCitiesOfState("PK", "PB"));

  const { isLoading, shippingAddress } = useSelector((state) => state.order);

  const { cartItems } = useSelector((state) => state.cart);
  // console.log(shippingAddress);

  const [shipping, setShipping] = useState({
    address: shippingAddress?.address || "",
    city: shippingAddress?.city || "",
    postalCode: shippingAddress?.postalCode || "",
    country: shippingAddress?.country || "Pakistan",
    state: shippingAddress?.state || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setShipping({ ...shipping, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setShippingAddress(shipping));
    setShipping({
      address: "",
      city: "",
      postalCode: "",
      country: "Pakistan",
      state: "",
    });
    navigate("/checkout/order-confirm");
  };

  useEffect(() => {
    if (!cartItems) {
      navigate("/");
    }
  }, [cartItems]);

  return (
    <>
      {/* Registeration form - signup */}
      <section className="container mx-auto flex justify-center flex-col items-center">
        <div className="max-w-xl lg:max-w-2xl w-full mx-auto bg-white rounded-xl shadow-xl p-6 mb-10">
          <form onSubmit={submitHandler}>
            <p className="text-2xl sm:text-3xl font-semibold text-center mb-6">
              Shipping Info
            </p>
            <FloatingInput
              label="Address"
              name="address"
              icon={FaAddressBook}
              type="text"
              value={shipping.address}
              onChange={handleChange}
            />

            <FloatingInput
              label="Country"
              name="country"
              icon={FaCity}
              type="text"
              value={shipping.country}
              onChange={handleChange}
            />

            <div className="mb-7 relative">
              <FaCity className="text-xl text-gray-500 absolute top-4 left-2.5 z-10" />
              <select
                name="state"
                value={shipping.state}
                onChange={handleChange}
                className={`w-full relative pl-10 pr-3 py-3 border border-gray-300 rounded-lg outline-none text-gray-800 bg-white peer transition-all duration-200 
                    focus:border-gray-300 focus:ring-1 focus:ring-gray-300`}
              >
                <option value="">Select State</option>
                {State.getStatesOfCountry("PK").map((state) => (
                  <option key={state.isoCode} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
              <label
                htmlFor="state"
                className={`absolute left-10 transition-all duration-200 text-gray-500 bg-white px-1
            ${
              isFocused || (shipping.state && shipping.state.length > 0)
                ? "-top-2.5 text-sm text-[#f96822]"
                : "top-1/2 -translate-y-1/2 text-base"
            }
          `}
              >
                State
              </label>
            </div>

            <div className="mb-7 relative">
              <FaCity className="text-xl text-gray-500 absolute top-4 left-2.5 z-10" />
              <select
                name="city"
                value={shipping.city}
                onChange={handleChange}
                className={`w-full relative pl-10 pr-3 py-3 border border-gray-300 rounded-lg outline-none text-gray-800 bg-white peer transition-all duration-200 
                    focus:border-gray-300 focus:ring-1 focus:ring-gray-300`}
              >
                <option value="">Select City</option>
                {City.getCitiesOfState(
                  "PK",
                  `${
                    State.getStatesOfCountry("PK").find(
                      (state) => state.name === shipping.state
                    )?.isoCode
                  }`
                ).map((city) => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
              <label
                htmlFor="city"
                className={`absolute left-10 transition-all duration-200 text-gray-500 bg-white px-1
            ${
              isFocused || (shipping.city && shipping.city.length > 0)
                ? "-top-2.5 text-sm text-[#f96822]"
                : "top-1/2 -translate-y-1/2 text-base"
            }
          `}
              >
                State
              </label>
            </div>

            <FloatingInput
              label="Postal Code"
              name="postalCode"
              icon={CiBarcode}
              type="number"
              value={shipping.postalCode}
              onChange={handleChange}
            />

            <LoadingButton isLoading={isLoading}>Continue</LoadingButton>
          </form>
        </div>
      </section>
    </>
  );
};

export default Shipping;
