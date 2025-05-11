import React, { useEffect, useState } from "react";
import innerBannr from "../../assets/inner-banner.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../Store/Products/ProductSliceReducers.js";
import { clearError } from "../../Store/Products/ProductSlice.js";
import { toast } from "react-toastify";
import { getAllCategories } from "../../Store/Category/CategorySliceReducers.js";
import Loader from "../../components/Loader/Loader.jsx";
import Banner from "../../components/Banner/Banner.jsx";
import { v4 as uuidv4 } from "uuid";
import { addToCartBackend } from "../../Store/Cart/CartSliceReducers.js";
import { addToCartLocal } from "../../Store/Cart/CartSlice.js";

const Shop = () => {
  const { isLoading, products, error } = useSelector((state) => state.products);
  const { category } = useSelector((state) => state.category);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [filterOpen, setFilterOpen] = useState(true);
  // console.log(filterOpen);

  const [filters, setFilters] = useState({
    category: "",
    page: 1,
    minPrice: 0,
    maxPrice: 10000,
    stock: true,
  });

  const handleFilterValueChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const handleApplyFilter = (mode = "filter") => {
    setFilters((prevFilters) => {
      let updatedFilters = { ...prevFilters };
      // console.log("When copy :" + updatedFilters.page);

      if (mode === "filter") {
        updatedFilters.page = 1; // Reset page number when applying a new filter
      } else if (mode === "load more") {
        updatedFilters.page++; // Increment page number for load more
        // console.log("When load more :" + updatedFilters.page);
      }

      // console.log(updatedFilters.minPrice + updatedFilters.maxPrice);
      console.log(updatedFilters);

      // Dispatch the action with updated filters
      dispatch(getAllProducts(updatedFilters));

      setFilters(updatedFilters);
      // console.log("finalyy updated : " + filters);
    });
    setFilterOpen(true);
  };

  const handleCleareFilters = () => {
    setFilters({
      category: "",
      page: 1,
      minPrice: 0,
      maxPrice: 10000,
      stock: true,
    });
    dispatch(getAllProducts());
    setFilterOpen(true);
  };

  const handleAddToCart = (id, quantity, price, stock) => {
    // console.log(stock);

    //data to send backend to create cart
    const itemDataToAddToCartBackend = {
      productId: id,
      quantity,
      price,
    };

    //data to send backend to create cart
    const itemDataToAddToCartLocal = {
      product: id,
      quantity,
      price,
      _id: uuidv4(),
      stock,
    };

    //when user logged in
    if (isAuthenticated !== "") {
      dispatch(addToCartBackend(itemDataToAddToCartBackend));
    } else if (isAuthenticated === "") {
      dispatch(addToCartLocal(itemDataToAddToCartLocal));
      toast.success("item added to cart successfully");
    }
  };

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, []);
  return (
    <>
      <div className="relative">
        {/* Banner */}
        <div
          style={{
            background: `linear-gradient(rgba(34, 46, 89, 0.7), rgba(7, 18, 62, 0.7)),url(${innerBannr})`,
          }}
          className="bg-cover bg-center"
        >
          <Banner />
        </div>

        {/* filter panel  */}
        <div
          className={`bg-white  ease-in duration-150 z-[60] fixed  top-0 w-[300px] h-full  p-5 shadow-lg   ${
            filterOpen === false ? "left-0 top-0" : "-left-[100%] top-0"
          }`}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#f96822]">
              Filter Products
            </h2>
            <button
              onClick={() => setFilterOpen(true)}
              className="text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
          </div>
          <div className="mt-5">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">Price Range</h3>
              <div className="flex gap-4">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={filters?.minPrice}
                  onFocus={(e) => {
                    if (e.target.value === "0") e.target.value = ""; // Clear default value on focus
                  }}
                  onChange={(e) =>
                    handleFilterValueChange("minPrice", e.target.value)
                  }
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#f96822] focus:border-[#f96822] p-2.5 w-1/2"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  onFocus={(e) => {
                    if (e.target.value === "10000") e.target.value = ""; // Clear default value on focus
                  }}
                  value={filters?.maxPrice}
                  onChange={(e) =>
                    handleFilterValueChange("maxPrice", e.target.value)
                  }
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#f96822] focus:border-[#f96822] p-2.5 w-1/2"
                />
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold">Availablity</h3>
              <div className="flex items-center gap-2 mt-2">
                <input
                  checked={filters?.stock}
                  onChange={(e) =>
                    setFilters((prevFilters) => ({
                      ...prevFilters,
                      stock: e.target.checked,
                    }))
                  }
                  type="checkbox"
                  id="inStock"
                  className="w-4 h-4"
                />
                <label htmlFor="inStock" className="text-sm">
                  In Stock
                </label>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" id="OutStock" className="w-4 h-4" />
                <label htmlFor="OutStock" className="text-sm">
                  Out Stock
                </label>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">Category</h3>
              <select
                value={filters?.category}
                onChange={(e) =>
                  handleFilterValueChange("category", e.target.value)
                }
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#f96822] focus:border-[#f96822] block w-full p-2.5"
              >
                <option value="">All Categories</option>
                {category?.category?.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={() => handleApplyFilter("filter")}
            className="bg-[#f96822] hover:bg-[#9f522bf8] text-white text-lg w-full py-2 rounded-lg mt-5"
          >
            Apply Filters
          </button>
          <button
            onClick={() => handleCleareFilters()}
            className="bg-red-600 hover:bg-red-899 text-white text-lg w-full py-2 rounded-lg mt-5"
          >
            Clear Filters
          </button>
        </div>
        {/* Products */}
        <section>
          {isLoading ? (
            <Loader />
          ) : (
            <div>
              <p className="text-6xl mt-2 font-bold text-center">
                Our Products
              </p>
              <p className="text-lg mt-2 text-center text-gray-600">
                Showing {products?.productCount || 0} of{" "}
                {products?.totalProductCount || 0} products
              </p>

              {/* filters button */}
              <div className="w-[100%] flex items-center justify-between px-[90px] mt-10">
                <div className="filter-button">
                  <button
                    onClick={() => setFilterOpen(false)}
                    className="bg-[#f96822] hover:bg-[#9f522bf8]  text-xl z-50  text-[#ffff] ease-in duration-200 rounded-3xl px-7 py-2 "
                  >
                    filters
                  </button>
                </div>
                <div className="dropdown">
                  <select className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#f96822] focus:border-[#f96822] block p-2.5">
                    <option value="">Sort By</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                    <option value="lowToHigh">low to high</option>
                    <option value="highToLow">high to low</option>
                  </select>
                </div>
              </div>

              <div className="grid lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-[60px] mb-20 mt-5 ">
                {products?.product?.map((prod) => {
                  return (
                    <Link to={`/single-product/${prod._id}`} key={prod._id}>
                      <div className="mx-2 hover:bg-gray-100 mt-2 relative flex flex-col items-center bg-white  border border-gray-200 rounded-lg shadow-md cursor-pointer">
                        <img
                          src={prod.images[0]?.url}
                          className="w-[200px] h-[250px]"
                          alt=""
                        />

                        <figcaption className="absolute top-2 text-white left-2 px-3 py-[3px] bg-[#f96822] rounded-full">
                          {prod.category?.name}
                        </figcaption>

                        <p className=" text-black text-lg font-bold">
                          {prod.name}
                        </p>
                        <div className="flex gap-4">
                          <p className="font-bold text-black text-lg">
                            ${prod.price}
                          </p>
                        </div>
                        <Link
                          to={`/shop`}
                          onClick={() =>
                            handleAddToCart(
                              prod?._id,
                              1,
                              prod?.price,
                              prod?.stock
                            )
                          }
                          className="bg-[#f96822] hover:bg-[#9f522bf8] z-50 text-lg text-[#ffff] ease-in duration-200 rounded-3xl px-5 py-2 my-3"
                          type="button"
                        >
                          Add to Cart
                        </Link>
                      </div>
                    </Link>
                  );
                })}
              </div>
              {/* Load More Button */}
              {products?.totalProductToSend < products?.productCount && (
                <div className="flex justify-center mb-6 mt-0">
                  <button
                    onClick={() => handleApplyFilter("load more")}
                    disabled={isLoading}
                    className="px-6 py-2 rounded bg-[#f96822] hover:bg-[#9f522bf8] text-white font-medium transition"
                  >
                    {isLoading && isLoading === true
                      ? "Loading..."
                      : "Load More"}
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Shop;
