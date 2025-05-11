import React, { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { Link, useNavigate } from "react-router-dom";
import { RiShareBoxFill } from "react-icons/ri";
import { useSelector } from "react-redux";

const OrdersTable = () => {
  const navigate = useNavigate();
  const { error, order } = useSelector((state) => state.order);

  const data = useMemo(() => {
    return (
      order &&
      order.map((ord, index) => ({
        number: index + 1,
        image: ord.orderItems[0]?.image?.url,
        orderId: ord._id,
        price: ord.totalPrice,
        details: ord._id,
      }))
    );
  }, [order]);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "number",
      },
      {
        Header: "Image",
        accessor: "image",
        Cell: ({ value }) => (
          <div className="flex items-center justify-center">
            <img
              src={value}
              alt="Product"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-cover rounded"
            />
          </div>
        ),
      },
      {
        Header: "Order ID",
        accessor: "orderId",
        Cell: ({ value }) => (
          <span className="text-xs sm:text-sm break-words">{value}</span>
        ),
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: ({ value }) => (
          <span className="text-xs sm:text-sm">Rs. {value.toFixed(2)}</span>
        ),
      },
      {
        Header: "Details",
        accessor: "details",
        Cell: ({ value }) => (
          <button
            onClick={() => navigate(`/user/order/${value}`)}
            className="text-gray-900 hover:text-gray-700"
            title="View Order"
          >
            <RiShareBoxFill className="w-5 h-5" />
          </button>
        ),
      },
    ],
    [navigate]
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
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination
  );

  return (
    <>
      <div className="mb-7">
        <h2 className="lg:text-6xl text-5xl font-bold text-gray-900 text-center mb-3">
          Orders
        </h2>
        <div className="flex items-center justify-center text-gray-900 gap-1 text-md font-normal">
          <Link to={"/"}>Home</Link>
          <span>/</span>
          <span>Orders</span>
        </div>
      </div>

      <div className="overflow-x-auto bg-bg-color p-2 sm:p-5 w-full md:w-[80vw] lg:w-[70vw] mx-auto">
        <table
          {...getTableProps()}
          className="min-w-max w-full text-xs sm:text-sm table-auto border-collapse border border-gray-400"
        >
          <thead className="bg-gray-900 text-white/90">
            {headerGroups.map((headerGroup, index) => (
              <tr
                key={index}
                {...headerGroup.getHeaderGroupProps()}
                className="text-center"
              >
                {headerGroup.headers.map((column, index) => (
                  <th
                    key={index}
                    {...column.getHeaderProps()}
                    className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-400"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="text-gray-900">
            {page.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr
                  key={rowIndex}
                  {...row.getRowProps()}
                  className="text-center"
                >
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
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

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-3 mt-5 text-gray-900 flex-wrap text-sm">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-4 py-1 bg-[#f98662] text-white/90 rounded disabled:opacity-50"
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
            className="px-4 py-1 bg-[#f98662] text-white/90 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default OrdersTable;
