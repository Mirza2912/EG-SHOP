import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../Store/Auth/AuthSliceReducers";
import {
  clearError,
  clearForgotPasswordMessage,
} from "../../Store/Auth/AuthSlice";
import { toast } from "react-toastify";

const ForgotUserPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error, forgotPasswordMessage } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (forgotPasswordMessage) {
      toast.success(forgotPasswordMessage);
      dispatch(clearForgotPasswordMessage());
      navigate("/user/otp-verification");
      setEmail("");
    }
  }, [error, forgotPasswordMessage]);
  return (
    <section className="container pt-20 pb-16 mx-auto flex justify-center flex-col items-center">
      <div className="rounded-xl shadow-2xl lg:w-[75%] w-[100%] px-9 py-5 mb-5">
        <form className="mx-auto mt-4" onSubmit={handleSubmit}>
          <div>
            <p className="text-3xl font-semibold text-center pb-5">
              Forgot Your Password
            </p>

            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            Forgot your password
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotUserPassword;
