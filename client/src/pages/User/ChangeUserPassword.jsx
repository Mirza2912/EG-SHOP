import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeUserPassword,
  editUserProfile,
} from "../../Store/Auth/AuthSliceReducers";
import { toast } from "react-toastify";
import { clearError } from "../../Store/Auth/AuthSlice";

const EditUserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUpdatePasswordChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeUserPassword(formData));
  };

  return (
    <section className="container mx-auto flex justify-center flex-col items-center">
      <div className="rounded-xl shadow-2xl lg:w-[75%] w-[100%] px-9 py-5 mb-5">
        <form className="mx-auto mt-4" onSubmit={handleSubmit}>
          <div>
            <p className="text-3xl font-semibold text-center pb-5">
              Update Your Profile
            </p>
            <div className="mb-5">
              <label
                htmlFor="oldPassword"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Old Password
              </label>
              <input
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleUpdatePasswordChange}
                placeholder="Your old password"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="newPassword"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                placeholder="You new password"
                value={formData.newPassword}
                onChange={handleUpdatePasswordChange}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleUpdatePasswordChange}
                name="confirmPassword"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`text-white mt-5 bg-[#f96822] hover:bg-[#f0824a] rounded-lg text-lg w-full px-5 py-6 text-center shadow-xl ${
              isLoading && isLoading === true && "opacity-50 cursor-not-allowed"
            }`}
          >
            Change your password
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditUserProfile;
