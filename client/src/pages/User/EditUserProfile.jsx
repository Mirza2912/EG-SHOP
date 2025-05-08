import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUserProfile } from "../../Store/Auth/AuthSliceReducers";
import { toast } from "react-toastify";
import { clearError } from "../../Store/Auth/AuthSlice";
import { FaPhoneAlt, FaUserCircle } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import FloatingInput from "../../components/FloatingInput/FloatingInput";
import LoadingButton from "../../components/LoadingButton/LoadingButton";

const EditUserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isFocused, setIsFocused] = useState(null);
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
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-xl lg:max-w-2xl w-full mx-auto bg-white rounded-xl shadow-xl p-6">
        <form onSubmit={handleSubmit}>
          <div>
            <p className="text-2xl sm:text-3xl font-semibold text-center mb-6">
              Update Your Profile
            </p>

            <FloatingInput
              label="Username"
              name="name"
              icon={FaUserCircle}
              type="text"
              value={formData.name}
              onChange={handleUpdateProfileChange}
            />

            <FloatingInput
              label="Email"
              name="email"
              icon={MdOutlineMail}
              type="email"
              value={formData.email}
              onChange={handleUpdateProfileChange}
            />

            <FloatingInput
              label="Phone 03xxxxxxxxx"
              name="number"
              icon={FaPhoneAlt}
              type="number"
              value={formData.phone}
              onChange={handleUpdateProfileChange}
            />
          </div>

          <LoadingButton isLoading={isLoading}>Update</LoadingButton>
        </form>
      </div>
    </section>
  );
};

export default EditUserProfile;
