// src/pages/Shipping.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import innerBannr from "../../assets/inner-banner.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setShippingAddress } from "../../Store/Order/OrderSlice";
import { Country, State, City } from "country-state-city";
import { loadShippingFromLocalStorage } from "../../Store/Order/OrderLocalStorageHandler";

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(City.getCitiesOfState("PK", "PB"));

  const { isLoading, shippingAddress } = useSelector((state) => state.order);
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

  return (
    <>
      {/* Registeration form - signup */}
      <section className="container mx-auto flex justify-center flex-col items-center">
        <div className="rounded-xl shadow-2xl lg:w-[75%] w-[100%] px-9 py-5 mb-5">
          <form className="mx-auto mt-4" onSubmit={submitHandler}>
            <div>
              <p className="text-3xl font-semibold text-center pb-5">
                Shipping Address
              </p>
              <div className="mb-5">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={shipping.address}
                  onChange={handleChange}
                  placeholder="Your address"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="country"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  placeholder="Enter your email"
                  value={shipping.country}
                  readOnly
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="state"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  State
                </label>
                <select
                  name="state"
                  value={shipping.state}
                  onChange={handleChange}
                  className=" bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                >
                  <option value="">Select State</option>
                  {State.getStatesOfCountry("PK").map((state) => (
                    <option key={state.isoCode} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  City
                </label>
                <select
                  name="city"
                  value={shipping.city}
                  onChange={handleChange}
                  className=" bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
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
              </div>
              <div className="mb-5">
                <label
                  htmlFor="postalCode"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Postal Code
                </label>
                <input
                  type="number"
                  placeholder="Your postal code"
                  value={shipping.postalCode}
                  onChange={handleChange}
                  name="postalCode"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`text-white mt-5 bg-[#f96822] hover:bg-[#f0824a] rounded-lg text-lg w-full px-5 py-6 text-center shadow-xl ${
                isLoading &&
                isLoading === true &&
                "opacity-50 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Shipping;
