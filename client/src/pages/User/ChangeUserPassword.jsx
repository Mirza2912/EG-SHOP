import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeUserPassword,
  editUserProfile,
} from "../../Store/Auth/AuthSliceReducers";
import { toast } from "react-toastify";
import { clearError } from "../../Store/Auth/AuthSlice";
import { RiLockPasswordLine } from "react-icons/ri";
import FloatingInput from "../../components/FloatingInput/FloatingInput";
import LoadingButton from "../../components/LoadingButton/LoadingButton";

const EditUserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isFocused, setIsFocused] = useState(null);
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
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-xl lg:max-w-2xl w-full mx-auto bg-white rounded-xl shadow-xl p-6">
        <form className="mx-auto mt-4" onSubmit={handleSubmit}>
          <div>
            <p className="text-2xl sm:text-3xl font-semibold text-center mb-6">
              Change Password
            </p>
            <FloatingInput
              label="Old password"
              name="oldPassword"
              icon={RiLockPasswordLine}
              type="password"
              value={formData.oldPassword}
              onChange={handleUpdatePasswordChange}
            />

            <FloatingInput
              label="New password"
              name="newPassword"
              icon={RiLockPasswordLine}
              type="password"
              value={formData.newPassword}
              onChange={handleUpdatePasswordChange}
            />

            <FloatingInput
              label="Confirm password"
              name="confirmPassword"
              icon={RiLockPasswordLine}
              type="password"
              value={formData.confirmPassword}
              onChange={handleUpdatePasswordChange}
            />
          </div>

          <LoadingButton isLoading={isLoading}>Change Password</LoadingButton>
        </form>
      </div>
    </section>
  );
};

export default EditUserProfile;
