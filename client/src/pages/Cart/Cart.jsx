import React, { Fragment, useEffect, useState } from "react";
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

  const [subTotal, setSubTotal] = useState(0);
  // console.log(subTotal);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const [quantity, setQuantity] = useState(1);

  const [editCartQuantity, setEditCartQuantity] = useState(null);

  //method for handle item of cart updation
  const handleAddToCartUpdate = (quantity, itemId, price) => {
    // console.log(quantity, itemId, price);

    //object to send backend to update item
    const updateDataToCartItemBackend = {
      productId: itemId,
      quantity,
      price,
    };

    //object to send backend to update item
    const updateDataToCartItemLocal = {
      productId: itemId,
      quantity,
      price,
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
      setCart(cartItems);
    } else if (isAuthenticated !== "") {
      dispatch(deleteCartItemBackend(id));
      setCart(cartItems);
    }
  };

  useEffect(() => {
    const total = cart?.reduce((acc, item) => {
      const price = item?.product?.price || 0;
      const discount = item?.product?.discount || 0;
      const quantity = item?.quantity || 0;

      return acc + quantity * (price - discount);
    }, 0);

    setSubTotal(total);
  }, [cart]);

  useEffect(() => {
    let updatedCart = [];

    //if any error come
    if (error) {
      // toast.error(error);
      dispatch(clearError());
    }

    //check if user not logged in then we will check singleproduct object and convert our items of cart's product id to its actuall product because if user not logged in then in cart item there will be not actual product not product id
    if (isAuthenticated === "") {
      if (cartItems?.length > 0) {
        cartItems?.forEach((item) => {
          // If product details exist in the singleProduct object
          if (singleProduct && singleProduct[item?.product]) {
            updatedCart.push({
              product: singleProduct[item.product],
              quantity: item.quantity,
              price: item.price,
              _id: item._id,
            });
          } else {
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
        <Fragment>
          {cart?.length > 0 ? (
            <div className="mx-auto rounded-lg shadow-2xl mt-5 bg-white max-w-7xl px-4 sm:px-6 lg:px-8 mb-5">
              <div className="border-gray-200 px-4 pb-6 pt-3 sm:px-6">
                <h1 className="text-4xl text-center my-12 font-bold tracking-tight text-gray-900">
                  Cart
                </h1>
                <div className="flex items-center justify-between my-7 text-xl font-bold border-b border-gray-500 py-6">
                  <p>Product</p>
                  <p>Total</p>
                </div>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-300 ">
                    {cart &&
                      cart.length > 0 &&
                      cart.map((item) => {
                        return (
                          <Fragment key={item?._id}>
                            <li className=" py-6">
                              <div className="flex justify-between ">
                                <div className="flex items-center">
                                  {/* //images  */}
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={
                                        item?.product?.images?.length > 0
                                          ? item?.product?.images[0]?.url
                                          : ""
                                      }
                                      alt={
                                        item?.product?.images?.length > 0
                                          ? item?.product?.images[0]?.public_id
                                          : "error"
                                      }
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  {/* price  */}
                                  <div className="ml-3 flex flex-col  text-gray-900">
                                    <div className="flex flex-col ">
                                      <h3 className="text-md font-semibold">
                                        {item?.product?.name}
                                      </h3>
                                      <p className="text-gray-500  text-sm">
                                        Rs.{item?.product?.price}
                                      </p>
                                    </div>
                                    {/* wuantity and edit wuantity  */}
                                    <div className="flex flex-col ">
                                      {editCartQuantity === item._id ? (
                                        // quantity button
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
                                      ) : (
                                        <div>
                                          <p className="text-black text-sm ">
                                            Quantity: {item?.quantity}
                                          </p>
                                        </div>
                                      )}
                                      {editCartQuantity === item._id ? (
                                        <button
                                          onClick={() =>
                                            handleAddToCartUpdate(
                                              quantity,
                                              item?._id,
                                              item?.product?.price * quantity
                                            )
                                          }
                                          type="button"
                                          className="font-semibold text-md  text-[#f98622] hover:text-[#9f522bf8] "
                                        >
                                          update quantity
                                        </button>
                                      ) : (
                                        <div>
                                          <button
                                            onClick={() =>
                                              setEditCartQuantity(item._id)
                                            }
                                            type="button"
                                            className="font-semibold text-md  text-[#f98622] hover:text-[#9f522bf8] "
                                          >
                                            edit quantity
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className={`flex flex-col ${
                                    item?.product?.discount > 0
                                      ? "justify-evenly"
                                      : "justify-between"
                                  } items-center`}
                                >
                                  <div>
                                    <p className=" text-md font-semibold text-black">
                                      Rs.{item?.product?.price * item?.quantity}
                                    </p>
                                  </div>
                                  {item?.product?.discount > 0 && (
                                    <div className="flex items-center">
                                      <p className=" text-md font-semibold text-black mr-2">
                                        - Rs.
                                        {item?.product?.discount *
                                          item?.quantity}
                                      </p>
                                    </div>
                                  )}
                                  <div className="">
                                    <button
                                      onClick={() => handleRemoveItem(item._id)}
                                      type="button"
                                      className="font-semibold text-[#f98622] hover:text-[#9f522bf8] "
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </Fragment>
                        );
                      })}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-500 px-4 py-6 sm:px-6">
                <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                  <p>Subtotal</p>
                  <div className="flex flex-col items-end">
                    <p className="text-gray-500 font-normal">shipping : 200</p>
                    <p>Rs.{subTotal + 200}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    to={"/checkout/shipping"}
                    className="flex items-center justify-center rounded-md border border-transparent bg-[#f96822] hover:text-[#9f522bf8] px-6 py-3 text-base font-medium text-white shadow-sm"
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
        </Fragment>
      )}
    </>
  );
};

export default Cart;
