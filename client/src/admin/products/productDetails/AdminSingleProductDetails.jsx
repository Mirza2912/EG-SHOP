import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { getSingleProductAdmin } from "../../../Store/Products/ProductSliceReducers";

const AdminSingleProductDetails = ({ route, setRoute }) => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  console.log(route);

  const { singleProductAdmin } = useSelector((state) => state.products);
  // console.log(singleProductAdmin);

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
      <div className="min-h-[90vh] flex items-center justify-center bg-gray-50">
        <div className="lg:w-[75%] xl:w-[65%] w-full  sm:mx-4 md:w-[80%] md:mx-6 my-7 bg-white rounded-2xl shadow-lg  p-6 sm:p-10">
          <h2 className="lg:text-6xl text-5xl font-bold text-gray-900 text-center mb-14">
            Single Product Details
          </h2>
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
            <div className="w-full sm:w-1/2 text-sm sm:text-base ">
              <div className="mb-3">
                <span className="font-semibold text-gray-900 text-xl ">
                  Name:
                </span>{" "}
                {singleProductAdmin?.name}
              </div>
              <div className="mb-3">
                <span className="font-semibold text-gray-900 text-xl ">
                  Price:
                </span>{" "}
                ${singleProductAdmin?.price}
              </div>
              <div className="mb-3">
                <span className="font-semibold text-gray-900 text-xl ">
                  Category:
                </span>{" "}
                {singleProductAdmin?.category?.name}
              </div>
              <div className="mb-3">
                <span className="font-semibold text-gray-900 text-xl ">
                  Calories:
                </span>{" "}
                {singleProductAdmin?.calories}
              </div>
              <div className="mb-3">
                <span className="font-semibold text-gray-900 text-xl ">
                  Stock:
                </span>{" "}
                <span
                  className={
                    singleProductAdmin?.stock > 0
                      ? "text-green-600"
                      : "text-red-500"
                  }
                >
                  {singleProductAdmin?.stock > 0
                    ? `${singleProductAdmin?.stock}`
                    : "Out of Stock"}
                </span>
              </div>
              <div className="mb-3">
                <span className="font-semibold text-gray-900 text-xl ">
                  CreatedAt:
                </span>{" "}
                {new Date(singleProductAdmin?.createdAt).toLocaleDateString()}
              </div>
              <div className="mb-3">
                <span className="font-semibold text-gray-900 text-xl ">
                  Description:
                </span>
                <p className="text-gray-900 mt-1">
                  {singleProductAdmin?.description}
                </p>
              </div>
              <div className="mt-6 text-center flex items-center justify-start">
                <Link
                  to="/admin/dashboard/products"
                  className="bg-[#f9744d] text-white px-6 py-2 rounded shadow hover:bg-[#f98662] transition"
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

export default AdminSingleProductDetails;
