import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaPhone, FaCalendar } from "react-icons/fa";
import { userDelete, userLogOut } from "../../Store/Auth/AuthSliceReducers";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(userLogOut());
  };

  const handleEditProfile = () => {
    // Navigate to edit profile page
    navigate("/user/edit-profile");
  };

  const handleChangePassword = () => {
    // Navigate("/user/change-password");
    navigate("/user/change-password");
  };

  const handleDeleteAccount = () => {
    dispatch(userDelete());
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error]);

  return (
    <section className="flex justify-center items-center  py-12 px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-xl">
        {/* Profile Header */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          My Profile
        </h1>

        {/* Profile Info */}
        <div className="space-y-6 mb-10">
          <div className="flex justify-between items-center">
            <p className="text-xl font-medium text-gray-600">Name:</p>
            <p className="text-xl text-gray-500">{user?.user?.name}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-xl font-medium text-gray-600">Email:</p>
            <p className="text-xl text-gray-500">{user?.user?.email}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-xl font-medium text-gray-600">Phone:</p>
            <p className="text-xl text-gray-500">{user?.user?.phone}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-xl font-medium text-gray-600">Joined:</p>
            <p className="text-xl text-gray-500">
              {new Date(user?.user?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={handleEditProfile}
            className="relative text-xl font-medium  transition-all duration-300 hover:text-[#ff8a4c] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#ff8a4c] hover:after:w-full after:transition-all after:duration-300"
          >
            Edit Profile
          </button>

          <button
            onClick={handleChangePassword}
            className="relative text-xl font-medium  transition-all duration-300 hover:text-[#ff8a4c] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#ff8a4c] hover:after:w-full after:transition-all after:duration-300"
          >
            Change Password
          </button>

          <button
            onClick={handleDeleteAccount}
            className="relative text-xl font-medium  transition-all duration-300 hover:text-[#ff8a4c] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#ff8a4c] hover:after:w-full after:transition-all after:duration-300"
          >
            Delete Account
          </button>

          <button
            onClick={handleLogout}
            className="relative text-xl font-medium  transition-all duration-300 hover:text-[#ff8a4c] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#ff8a4c] hover:after:w-full after:transition-all after:duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
