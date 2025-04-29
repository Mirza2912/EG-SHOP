import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import innerBannr from "../../assets/inner-banner.jpg";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../../Store/Products/ProductSliceReducers";
import { FaRegFaceFrown } from "react-icons/fa6";
import {
  addToCartUpdateBackend,
  deleteCartItemBackend,
  getCart,
} from "../../Store/Cart/CartSliceReducers";
import { toast } from "react-toastify";
import {
  clearAddToCartUpdateBackendMessage,
  clearError,
  removeCartItemLocal,
  updateCartItemLocal,
} from "../../Store/Cart/CartSlice";
import Loader from "../../components/Loader/Loader";

const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems, error, isLoading } = useSelector((state) => state.cart);
  // console.log(cartItems);

  const { singleProduct } = useSelector((state) => state.products);
  // console.log(singleProduct);

  const [cart, setCart] = useState([]);
  // console.log(cart);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const [quantity, setQuantity] = useState(1);

  const [editCartQuantity, setEditCartQuantity] = useState(null);

  //method for handle item of cart updation
  const handleAddToCartUpdate = (quantity, itemId) => {
    // console.log(quantity, itemId);

    //object to send backend to update item
    const updateDataToCartItemBackend = {
      productId: itemId,
      quantity,
    };

    //object to send backend to update item
    const updateDataToCartItemLocal = {
      productId: itemId,
      quantity,
    };
    // console.log(updateDataToCartItem);

    //if user logged in
    if (isAuthenticated !== "") {
      dispatch(addToCartUpdateBackend(updateDataToCartItemBackend));
    }

    //if user not loggin
    if (isAuthenticated === "") {
      // console.log("true");

      dispatch(updateCartItemLocal(updateDataToCartItemLocal));
    }

    setEditCartQuantity(null);
  };

  const handleIncrease = (id) => {
    // console.log(id);

    const findItem = cart?.find((item) => item?._id === id);
    setQuantity((prev) => (findItem?.product?.stock > prev ? prev + 1 : prev));
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleRemoveItem = (id) => {
    // console.log(id);

    if (isAuthenticated === "") {
      //when local item remove
      dispatch(removeCartItemLocal(id));
      // setCart(cartItems);
    } else if (isAuthenticated !== "") {
      dispatch(deleteCartItemBackend(id));
      // setCart(cartItems);
    }
  };

  useEffect(() => {
    let updatedCart = [];

    //if any error come
    if (error) {
      // toast.error(error);
      dispatch(clearError());
    }

    //check if user not logged in then we will check singleproduct object and convert our items of cart's product id to its actuall product because if user not logged in then in cart item there will be not actual product not product id
    if (isAuthenticated === "") {
      // console.log("ni login");

      if (cartItems?.length > 0) {
        // console.log("aho wdi a");

        cartItems?.forEach((item) => {
          // console.log(item?.productId);

          // If product details exist in the singleProduct object
          if (singleProduct && singleProduct[item?.product]) {
            updatedCart.push({
              product: singleProduct[item.product],
              quantity: item.quantity,
              price: item.price,
              _id: item._id,
            });
            // console.log(updatedCart);
          } else {
            // console.log(item?.productId);

            // If product details are not available, dispatch to  fetch product
            dispatch(getSingleProduct(item?.product));
          }
        });

        // Update the cart state after looping through the cartItems
        setCart(updatedCart);
      } else {
        setCart([]);
      }
    } else if (isAuthenticated !== "") {
      // dispatch(getCart());
      console.log("login wa");
      // console.log(cartItems);

      setCart(cartItems);
    }
  }, [cartItems, singleProduct, isAuthenticated, error]);

  return (
    <>
      <section>
        {/* Banner */}
        <div
          style={{
            background: `linear-gradient(rgba(34, 46, 89, 0.7), rgba(7, 18, 62, 0.7)),url(${innerBannr})`,
          }}
          className="bg-cover bg-center"
        >
          <p className="text-4xl text-center text-white font-bold pt-28">
            Cart
          </p>
          {/* Breadcrumbs */}
          <div className="pb-28">
            <nav className="text-center font-bold mt-4" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <Link
                    to={"/"}
                    href="#"
                    className="inline-flex items-center text-white hover:text-gray-300 duration-300"
                  >
                    <svg
                      className="w-3 h-3 me-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <Link
                      to={"/cart"}
                      className="ms-1 text-white hover:text-gray-300 duration-300"
                    >
                      cart
                    </Link>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </section>

      {/* Cart Table */}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {cart?.length > 0 ? (
            <div className="mx-auto rounded-lg shadow-2xl mt-5 bg-white max-w-7xl px-4 sm:px-6 lg:px-8 mb-5">
              <div className="border-gray-200 px-4 pb-6 pt-3 sm:px-6">
                <h1 className="text-4xl text-center my-12 font-bold tracking-tight text-gray-900">
                  Cart
                </h1>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cart.map((item) => {
                      return (
                        <>
                          <li key={item?._id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={
                                  item?.product?.images[0]?.url ||
                                  "/src/assets/about-bg.jpg"
                                }
                                alt={
                                  item?.product?.images[0]?.public_id || "error"
                                }
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a>{item?.product?.name}</a>
                                  </h3>
                                  <p className="ml-4">{item?.price}</p>
                                </div>
                                {/* <p className="mt-1 text-lg text-black"></p> */}
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="flex flex-col items-center justify-center">
                                  {editCartQuantity === item._id ? (
                                    <div className="flex items-center gap-4  mt-3">
                                      <div className="flex items-center gap-4 border border-gray-300 rounded">
                                        <button
                                          className="rounded-l border text-lg border-r-2 hover:bg-gray-400 text-gray-800 font-bold py-2 px-5 "
                                          onClick={handleDecrease}
                                        >
                                          -
                                        </button>
                                        <div className="text-xl font-semibold w-[13px] text-center">
                                          {quantity}
                                        </div>
                                        <button
                                          className=" hover:bg-gray-400 text-gray-800  font-bold py-2 px-5 border-l-2 text-lg rounded-r "
                                          onClick={() =>
                                            handleIncrease(item?._id)
                                          }
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <p className="text-black text-lg ">
                                      Quantity : {item?.quantity}
                                    </p>
                                  )}
                                  {editCartQuantity === item._id ? (
                                    <button
                                      onClick={() =>
                                        handleAddToCartUpdate(
                                          quantity,
                                          item?._id
                                        )
                                      }
                                      type="button"
                                      className="font-bold  text-[#f98622] hover:text-[#9f522bf8] "
                                    >
                                      update quantity
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() =>
                                        setEditCartQuantity(item._id)
                                      }
                                      type="button"
                                      className="font-bold  text-[#f98622] hover:text-[#9f522bf8] "
                                    >
                                      edit quantity
                                    </button>
                                  )}
                                </div>

                                <div className="flex">
                                  <button
                                    onClick={() => handleRemoveItem(item._id)}
                                    type="button"
                                    className="font-medium text-[#f98622] hover:text-[#9f522bf8] "
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        </>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>$262.00</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <Link
                    to={"/checkout"}
                    className="flex items-center justify-center rounded-md border border-transparent bg-[#f96822] hover:text-[#9f522bf8]px-6 py-3 text-base font-medium text-white shadow-sm"
                  >
                    Checkout
                  </Link>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <Link to={"/shop"}>
                      <button
                        type="button"
                        className="font-medium text-[#f96822] hover:text-[#9f522bf8]"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center my-20">
                <p className="text-center flex items-center justify-center gap-5  text-4xl sm:text-6xl font-bold text-[#f98622] ">
                  Empty Cart <FaRegFaceFrown />
                </p>
                <Link to={"/shop"}>
                  <button
                    type="button"
                    className="font-medium mt-3 text-[#f96822] hover:text-[#9f522bf8]"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Cart;
