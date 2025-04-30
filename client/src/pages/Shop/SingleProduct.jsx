import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearSingleProductMessage } from "../../Store/Products/ProductSlice";
import { clearError } from "../../Store/Products/ProductSlice";
import { getSingleProduct } from "../../Store/Products/ProductSliceReducers";
import Loader from "../../components/Loader/Loader";
import { addToCartBackend } from "../../Store/Cart/CartSliceReducers";
import { addToCartLocal } from "../../Store/Cart/CartSlice";
import { v4 as uuidv4 } from "uuid";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading, error, singleProduct } = useSelector(
    (state) => state.products
  );
  // console.log(singleProduct);

  let product = null;
  if (id in singleProduct) {
    product = singleProduct[id];
  }
  // console.log(product);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    if (product?.stock > quantity) setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    // console.log(product?._id);

    //data to send backend to create cart
    const itemDataToAddToCartBackend = {
      productId: product?._id,
      quantity,
      price: product?.price * quantity,
    };

    //data to send backend to create cart
    const itemDataToAddToCartLocal = {
      product: product?._id,
      quantity,
      price: product?.price * quantity,
      _id: uuidv4(),
    };
    //when user logged in
    if (isAuthenticated !== "") {
      dispatch(addToCartBackend(itemDataToAddToCartBackend));
    } else if (isAuthenticated === "") {
      dispatch(addToCartLocal(itemDataToAddToCartLocal));
    }
    navigate("/cart");
  };

  useEffect(() => {
    dispatch(getSingleProduct(id));

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <Loader />
      ) : product ? (
        <div className="bg-white p-10 shadow-xl rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Images Section */}
            <div>
              <div className="flex flex-col items-center">
                {/* Main Image */}
                <div className="w-96 p-6 h-64 md:h-96 ">
                  <img
                    src={product?.images[0]?.url || "/placeholder.jpg"}
                    alt={product?.name}
                    className="w-full h-full object-cover  rounded-lg"
                    id="mainImage"
                  />
                </div>

                {/* Thumbnail Images */}
                <div className="flex space-x-2 overflow-x-auto">
                  {product?.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-16 h-16 object-cover rounded-lg cursor-pointer border-2 border-gray-300 hover:border-[#f96822]"
                      onClick={() => {
                        const mainImage = document.getElementById("mainImage");
                        if (mainImage) mainImage.src = image.url;
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Product Details Section */}
            <div>
              <h1 className="text-xl font-semibold text-gray-800 mb-4">
                <span className="text-[#f96822] text-2xl font-bold">
                  Name :{" "}
                </span>{" "}
                {product?.name}
              </h1>
              <p className="text-gray-600 text-xl font-semibold mb-4">
                <span className="text-[#f96822] text-2xl font-bold">
                  Description :{" "}
                </span>{" "}
                {product?.description}
              </p>
              <p className="text-xl  font-semibold text-gray-800 mb-2">
                <span className="text-[#f96822] text-2xl font-bold">
                  Price :{" "}
                </span>{" "}
                ${product?.price}
              </p>
              {product?.discount > 0 && (
                <p className="text-xl font-semibold text-green-600 mb-2">
                  <span className="text-[#f96822] text-2xl font-bold">
                    Discount :{" "}
                  </span>{" "}
                  {product?.discount}%
                </p>
              )}
              <p
                className={`text-xl font-semibold mb-2 ${
                  product?.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                <span className="text-[#f96822] text-2xl font-bold">
                  Stock :{" "}
                </span>
                {product?.stock > 0 ? "In Stock" : "Out of Stock"}
              </p>
              <p className="text-xl font-semibold text-gray-600 mb-2">
                <span className="text-[#f96822] text-2xl font-bold">
                  Category :{" "}
                </span>{" "}
                {product?.category?.name || "N/A"}
              </p>
              <p className="text-xl font-semibold text-gray-600">
                <span className="text-[#f96822] text-2xl font-bold">
                  Returnable :{" "}
                </span>{" "}
                {product?.isReturnAble ? "Yes" : "No"}
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4  mt-3">
                <p className="text-[#f96822] text-2xl font-bold">Quantity :</p>
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
                    onClick={handleIncrease}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isLoading}
                className="bg-[#f96822] hover:bg-[#9f522bf8]  text-xl text-[#ffff] ease-in duration-200 rounded-3xl px-10 py-2 my-5"
                type="button"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Product not found</p>
      )}
    </div>
  );
};

export default SingleProduct;
