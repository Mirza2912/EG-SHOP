import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUserProfile } from "../../Store/Auth/AuthSliceReducers";
import { toast } from "react-toastify";
import { clearError } from "../../Store/Auth/AuthSlice";

const EditUserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: user?.user?.name || "",
    email: user?.user?.email || "",
    phone: user?.user?.phone || "",
  });

  const handleUpdateProfileChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUserProfile(formData));
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
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Username
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleUpdateProfileChange}
                placeholder="Username"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleUpdateProfileChange}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Contact No
              </label>
              <input
                type="Number"
                placeholder="Contact No "
                value={formData.phone}
                onChange={handleUpdateProfileChange}
                name="phone"
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
            Update your profile
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditUserProfile;
