import React, { useMemo, useState } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBin6Line, RiShareBoxFill, RiEdit2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { deleteProduct } from "../../Store/Products/ProductSliceReducers";

const AdminProductsTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminProducts, isLoading } = useSelector((state) => state.products);

  const { category } = useSelector((state) => state.category);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Filter data by name and category
  const filteredProducts = useMemo(() => {
    return adminProducts.filter((prod) => {
      const matchesName = prod.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory
        ? prod.category?.name === selectedCategory
        : true;
      return matchesName && matchesCategory;
    });
  }, [adminProducts, searchTerm, selectedCategory]);

  // Prepare data for table
  const data = useMemo(() => {
    return filteredProducts.map((prod, index) => ({
      number: index + 1,
      name: prod.name,
      image: prod.images?.[0]?.url,
      category: prod.category?.name,
      stock: prod.stock,
      details: prod._id,
      update: prod._id,
      delete: prod._id,
    }));
  }, [filteredProducts]);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "number",
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ value }) => <div className="text-center">{value}</div>,
      },
      {
        Header: "Image",
        accessor: "image",
        Cell: ({ value }) => (
          <div className="flex justify-center">
            <img
              src={value}
              alt="Product"
              className="h-10 w-10 object-cover rounded"
            />
          </div>
        ),
      },
      {
        Header: "Stock",
        accessor: "stock",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Details",
        accessor: "details",
        Cell: ({ value }) => (
          <button
            onClick={() =>
              navigate(
                `/admin/dashboard/products/single-products/details/${value}`
              )
            }
            title="View Details"
            className="text-gray-800 hover:text-gray-600"
          >
            <RiShareBoxFill className="w-5 h-5" />
          </button>
        ),
      },
      {
        Header: "Update",
        accessor: "update",
        Cell: ({ value }) => (
          <button
            onClick={() => navigate(`/admin/product/update/${value}`)}
            title="Edit Product"
            className="text-[#f98662] hover:cursor-pointer hover:text-[#9d513a]"
          >
            <RiEdit2Line className="w-5 h-5" />
          </button>
        ),
      },
      {
        Header: "Delete",
        accessor: "delete",
        Cell: ({ value }) => (
          <button
            onClick={() => dispatch(deleteProduct(value))}
            title="Delete Product"
            className="text-red-600 hover:text-red-800"
          >
            <RiDeleteBin6Line className="w-5 h-5" />
          </button>
        ),
      },
    ],
    [navigate, dispatch]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 5 } },
    useGlobalFilter,
    usePagination
  );

  return (
    <div className="my-7">
      <h2 className="lg:text-6xl text-5xl font-bold text-gray-900 text-center mb-3">
        All Products
      </h2>
      <div className="flex items-center justify-center text-gray-900 gap-1 text-md font-normal mb-4">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>All Products</span>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto bg-bg-color p-2 sm:p-5 w-full max-w-screen overflow-y-hidden mx-auto">
          {/* Search filters */}
          <div className="flex flex-wrap flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4 w-full">
            <input
              type="text"
              placeholder="Search by name..."
              className="px-4 py-2  border border-gray-300  rounded w-full max-w-xs block mx-auto text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2  border border-gray-300  rounded w-full max-w-xs block mx-auto text-sm"
            >
              <option value="">Search by category...</option>
              {category?.category?.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Table */}
          <table
            {...getTableProps()}
            className="min-w-full text-xs sm:text-sm table-auto border-collapse border border-gray-400"
          >
            <thead className="bg-gray-900 text-white/90">
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className="text-center"
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-2 sm:px-4 py-2 sm:py-3 border border-gray-400"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="text-gray-900">
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="text-center">
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="px-3 sm:px-4 py-2 border border-gray-300"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-5 text-gray-900 flex-wrap text-sm">
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="px-4 py-1 bg-[#f98662] text-white rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page <strong>{pageIndex + 1}</strong> of{" "}
              <strong>{pageOptions.length}</strong>
            </span>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="px-4 py-1 bg-[#f98662] text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsTable;
