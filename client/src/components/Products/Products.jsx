import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { incrementPage } from "../../Store/Products/ProductSlice";

const Products = ({ products, category, onFilterChange, isLoading }) => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  // console.log(page);

  const [filterOpen, setFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    category: "",
    page: 1,
  });
  console.log(filters);

  useEffect(() => {
    // This will reset the page to 1 whenever filters change
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: 1,
    }));
  }, [filters.category]);

  const handleFilterValueChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const handleApplyFilter = (mode = "filter") => {
    if (mode === "filter") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        page: 1, // reset page number when applying a new filter
      }));
      onFilterChange(filters);
    } else if (mode === "load more") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        page: prevFilters.page + 1, // increment page number for load more
      }));
      onFilterChange(filters);
    }
    setFilterOpen(false);
  };
  return (
    <>
      <section className="mt-[80px]">
        <div>
          <p className="text-6xl mt-2 font-bold text-center">Our Products</p>
          <p className="text-lg mt-2 text-center text-gray-600">
            Showing {products?.productCount || 0} of{" "}
            {products?.totalProductCount || 0} products
          </p>

          {/* filters button */}
          <div className="w-[100%] flex items-center justify-between px-[90px] mt-10">
            <div className="filter-button">
              <button
                onClick={() => setFilterOpen(true)}
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

          {/* filter panel  */}
          <div
            className={`bg-white left-0 top-0 ease-in duration-150 z-[60] fixed w-[300px] h-full  p-5 shadow-lg   ${
              filterOpen ? "left-0" : "-left-[100%]"
            }`}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#f96822]">
                Filter Products
              </h2>
              <button
                onClick={() => setFilterOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                ✖
              </button>
            </div>
            <div className="mt-5">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Availablity</h3>
                <div className="flex items-center gap-2 mt-2">
                  <input type="checkbox" id="inStock" className="w-4 h-4" />
                  <label htmlFor="inStock" className="text-sm">
                    In Stock
                  </label>
                </div>{" "}
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
                  value={filters.category}
                  onChange={(e) =>
                    handleFilterValueChange("category", e.target.value)
                  }
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#f96822] focus:border-[#f96822] block w-full p-2.5"
                >
                  <option value="">All Categories</option>
                  {category?.category?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
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
          </div>
          {/* </div> */}

          <div className="grid lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-[60px] mb-20 mt-5 ">
            {products?.product?.map((prod) => {
              return (
                <div
                  key={prod._id}
                  className="mx-2 hover:bg-gray-100 mt-2 relative flex flex-col items-center bg-white  border border-gray-200 rounded-lg shadow-md cursor-pointer"
                >
                  <img
                    src={prod.images[0]?.url}
                    className="w-[200px] h-[250px]"
                    alt=""
                  />

                  <figcaption className="absolute top-2 text-white left-2 px-3 py-[3px] bg-[#f96822] rounded-full">
                    {prod.category?.name}
                  </figcaption>

                  <p className=" text-black text-lg font-bold">{prod.name}</p>
                  <div className="flex gap-4">
                    <p className="font-bold text-black text-lg">
                      ${prod.price}
                    </p>
                  </div>
                  <button
                    className="bg-[#f96822] hover:bg-[#9f522bf8] z-50 text-lg text-[#ffff] ease-in duration-200 rounded-3xl px-5 py-2 my-3"
                    type="button"
                  >
                    Add to Cart
                  </button>
                </div>
              );
            })}
          </div>
          {/* Load More Button */}
          {/* {products?.productCount <= products?.totalProductCount && ( */}
          <div className="flex justify-center mb-6 mt-0">
            <button
              onClick={() => handleApplyFilter("load more")}
              disabled={isLoading}
              className="px-6 py-2 rounded bg-[#f96822] hover:bg-[#9f522bf8] text-white font-medium transition"
            >
              {isLoading && isLoading === true ? "Loading..." : "Load More"}
            </button>
          </div>
          {/* )} */}
        </div>
      </section>
    </>
  );
};

export default Products;
