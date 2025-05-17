import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getSingleUserDetails,
  updateUserRole,
} from "../../Store/Auth/AuthSliceReducers";
import Loader from "../../components/Loader/Loader";
import { FaRegEdit } from "react-icons/fa";

const AdminUsersSingleUserDetails = ({}) => {
  const { id } = useParams();
  // console.log(id);

  const { singleUserDetails, isLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const handleSelect = (role) => {
    setSelectedRole(role);
    setIsOpen(false);
    dispatch(updateUserRole({ role, id }));
  };

  useEffect(() => {
    dispatch(getSingleUserDetails(id));
  }, []);
  useEffect(() => {
    if (singleUserDetails?.data?.role) {
      setSelectedRole(singleUserDetails.data.role);
    }
  }, [singleUserDetails]);
  return (
    <div className="h-[90vh] flex items-center justify-center bg-gray-50">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="lg:w-1/2 w-full sm:w-[75%] sm:mx-auto mx-6 my-7 bg-white rounded-2xl shadow-lg  p-6 sm:p-10">
          <div className="my-7">
            <h2 className="lg:text-6xl text-5xl font-bold text-gray-900 text-center mb-3">
              {singleUserDetails?.data?.name}'s Details
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="text-gray-900 text-base sm:text-lg space-y-2">
              <p>
                <strong>Name:</strong> {singleUserDetails?.data?.name}
              </p>
              <p>
                <strong>Email:</strong> {singleUserDetails?.data?.email}
              </p>

              <div className="relative">
                <div
                  className="flex items-center justify-start gap-10"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <p>
                    <strong>Role:</strong> {selectedRole}
                  </p>
                  <FaRegEdit className="text-xl text-[#f98662] hover:cursor-pointer hover:text-[#eb7652]" />
                </div>

                {isOpen && (
                  <div className="absolute z-10 mt-2 bg-white border rounded shadow-lg w-32 text-sm text-gray-900">
                    <button
                      onClick={() => handleSelect("user")}
                      className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                    >
                      User
                    </button>
                    <button
                      onClick={() => handleSelect("admin")}
                      className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                    >
                      Admin
                    </button>
                  </div>
                )}
              </div>
              {singleUserDetails?.data?.phone && (
                <p>
                  <strong>Phone:</strong> {singleUserDetails?.data?.phone}
                </p>
              )}
              <p>
                <strong>Joined At:</strong>{" "}
                {new Date(
                  singleUserDetails?.data?.createdAt
                ).toLocaleDateString()}
              </p>
              {singleUserDetails?.data?.updatedAt && (
                <p>
                  <strong>Last Update At:</strong>{" "}
                  {new Date(
                    singleUserDetails?.data?.updatedAt
                  ).toLocaleDateString()}
                </p>
              )}

              <p>
                <strong>Suspended:</strong>{" "}
                {singleUserDetails?.data?.isSuspended
                  ? singleUserDetails?.data?.isSuspended
                  : "false"}
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/admin/dashboard/users"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Back to Users
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersSingleUserDetails;
