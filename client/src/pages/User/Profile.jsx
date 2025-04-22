import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
    <section className="flex flex-col lg:flex-row justify-center items-center text-center text-white bg-gray-600  relative ">
      {/* Background Overlay */}

      <div className="container  mx-auto py-12 relative z-10 flex flex-col lg:flex-row justify-evenly items-center w-full ">
        {/* Left Side */}
        <div className=" w-[100%] lg:w-[50%] mb-10 lg:mb-0 text-left ">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-center">
            Welcome,{" "}
            <span className="text-black dark:text-gray-900">
              {user?.user?.name}
            </span>
          </h1>
          <p className="text-lg text-white/80 text-center">
            Manage your profile and personal information.
          </p>
        </div>

        {/* Right Side */}
        <div className=" w-[100%] lg:w-[50%] xl:w-[40%] bg-white/10 backdrop-blur-md border border-white/20 py-8  rounded-2xl shadow-2xl text-white ">
          {/* Info Fields */}
          <div className=" text-left flex w-full flex-wrap items-center justify-evenly ">
            <div className="">
              <p className="flex items-center gap-1">
                <FaUser /> <span className="font-medium">Name:</span>
                {user?.user?.name}
              </p>
              <p className="flex items-center gap-1 mt-3">
                <FaEnvelope /> <span className="font-medium">Email:</span>
                {user?.user?.email}
              </p>
            </div>
            <div className="">
              <p className="flex items-center gap-1">
                <FaPhone /> <span className="font-medium">Phone:</span>
                {user?.user?.phone}
              </p>
              <p className="flex items-center gap-1 mt-3">
                <FaCalendar /> <span className="font-medium">Joined:</span>
                {new Date(user?.user?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 justify-items-center">
            <button
              onClick={handleEditProfile}
              className="cursor-pointer w-full  sm:w-48 px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-600 text-white rounded-md shadow hover:brightness-110 transition text-center"
            >
              Edit Profile
            </button>
            <button
              onClick={handleChangePassword}
              className="cursor-pointer  w-full  sm:w-48 px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-md shadow hover:brightness-110 transition text-center"
            >
              Change Password
            </button>
            <button
              onClick={handleDeleteAccount}
              className="cursor-pointer w-full  sm:w-48 px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-md shadow hover:brightness-110 transition text-center"
            >
              Delete Account
            </button>
            <button
              onClick={handleLogout}
              className="cursor-pointer  w-full  sm:w-48 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-md shadow hover:brightness-110 transition text-center"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
