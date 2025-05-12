import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getSingleProduct,
  getSingleProductAdmin,
} from "../../Store/Products/ProductSliceReducers";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { singleProductAdmin } = useSelector((state) => state.products);
  console.log(singleProductAdmin);

  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    dispatch(getSingleProductAdmin(id));
    if (singleProductAdmin) {
      setMainImage(
        singleProductAdmin?.images && singleProductAdmin?.images[0]?.url
      );
    }
  }, [singleProductAdmin]);
  return (
    <>
      <div className="my-7">
        <div>
          <h2 className="lg:text-6xl text-5xl font-bold text-gray-900 text-center mb-3">
            Single Product Details
          </h2>
          <div className="flex items-center justify-center text-gray-900 gap-1 text-md font-normal">
            <Link to={"/"}>Home</Link>
            <span>/</span>
            <Link to={"/admin/dashboard/products"}>All Products</Link>
            <span>/</span>
            <span>Single product</span>
          </div>
        </div>
        <div className="max-w-4xl xl:mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow rounded-lg mt-8 mx-4">
          <div className="flex flex-col gap-4 w-full sm:flex-row sm:items-start sm:justify-center sm:gap-4 md:gap-6">
            {/* Product Image */}
            <div className="w-full sm:w-1/2">
              {/* Big Main Image */}
              <img
                src={mainImage}
                alt="Selected"
                className="w-full h-[300px] object-cover rounded shadow-md"
              />

              {/* Small Thumbnails */}
              <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
                {singleProductAdmin?.images &&
                  singleProductAdmin?.images?.map((img, idx) => (
                    <img
                      key={idx}
                      src={img.url}
                      alt={`Thumbnail ${idx}`}
                      className={`w-14 h-14 object-cover border-2 rounded cursor-pointer ${
                        mainImage === img.url
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}
                      onClick={() => setMainImage(img.url)}
                    />
                  ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="w-full sm:w-1/2 text-sm sm:text-base">
              <div className="mb-3">
                <span className="font-semibold text-gray-700">Name:</span>{" "}
                {singleProductAdmin?.name}
              </div>
              <div className="mb-3">
                <span className="font-semibold text-gray-700">Price:</span> $
                {singleProductAdmin?.price}
              </div>
              <div className="mb-3">
                <span className="font-semibold text-gray-700">Category:</span>{" "}
                {singleProductAdmin?.category?.name}
              </div>
              <div className="mb-3">
                <span className="font-semibold text-gray-700">Stock:</span>{" "}
                <span
                  className={
                    singleProductAdmin?.stock > 0
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {singleProductAdmin?.stock > 0
                    ? `${singleProductAdmin?.stock} available`
                    : "Out of Stock"}
                </span>
              </div>
              <div className="mb-3">
                <span className="font-semibold text-gray-700">Created:</span>{" "}
                {new Date(singleProductAdmin?.createdAt).toLocaleDateString()}
              </div>
              <div className="mb-3">
                <span className="font-semibold text-gray-700">
                  Description:
                </span>
                <p className="text-gray-600 mt-1">
                  {singleProductAdmin?.description}
                </p>
              </div>
              <div className="mt-6 text-center flex items-center justify-start">
                <Link
                  to="/admin/dashboard/products"
                  className="bg-[#f98662] text-white px-6 py-2 rounded shadow hover:bg-[#f9744d] transition"
                >
                  Back to Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
