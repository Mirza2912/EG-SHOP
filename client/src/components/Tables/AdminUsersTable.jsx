import React, { useMemo } from "react";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBin6Line, RiShareBoxFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { deleteUser } from "../../Store/Auth/AuthSliceReducers";

const AdminUsersTable = () => {
  const navigate = useNavigate();
  const { isLoading, allUsers } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const data = useMemo(() => {
    return (
      allUsers &&
      allUsers.map((user, index) => ({
        number: index + 1,
        name: user.name,
        email: user.email,
        details: user._id,
        id: user._id,
      }))
    );
  }, [allUsers]);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "number",
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ value }) => (
          <div className="flex items-center justify-center">
            <h2>{value}</h2>
          </div>
        ),
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: ({ value }) => (
          <span className="text-xs sm:text-sm break-words">{value}</span>
        ),
      },
      {
        Header: "Details",
        accessor: "details",
        Cell: ({ value }) => (
          <button
            onClick={() =>
              navigate(`/admin/dashboard/users/single-user/details/${value}`)
            }
            className="text-gray-900 hover:text-gray-700"
            title="View Order"
          >
            <RiShareBoxFill className="w-5 h-5" />
          </button>
        ),
      },
      {
        Header: "Delete",
        accessor: "id",
        Cell: ({ value }) => (
          <button
            onClick={() => dispatch(deleteUser(value))}
            title="Delete User"
            className="text-red-600 hover:text-red-800"
          >
            <RiDeleteBin6Line className="w-5 h-5" />
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
    setGlobalFilter,
    state: { pageIndex, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useGlobalFilter,
    usePagination
  );

  return (
    <>
      <div className="my-7">
        <h2 className="lg:text-6xl text-5xl font-bold text-gray-900 text-center mb-3">
          All Users
        </h2>
        <div className="flex items-center justify-center text-gray-900 gap-1 text-md font-normal">
          <Link to={"/"}>Home</Link>
          <span>/</span>
          <span>All Uesrs</span>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto bg-bg-color p-2 sm:p-5 w-full md:w-[80vw] lg:w-[70vw] mx-auto">
          <input
            type="text"
            placeholder="Search by name..."
            className="mb-4 px-4 py-2 border border-gray-300 rounded w-full max-w-xs block mx-auto text-sm"
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />

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
                      className="px-2 sm:px-4 py-2 sm:py-3 border border-gray-400"
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
      )}
    </>
  );
};

export default AdminUsersTable;
