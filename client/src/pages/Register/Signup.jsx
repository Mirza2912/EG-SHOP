import React, { useEffect, useState } from "react";
import innerBannr from "../../assets/inner-banner.jpg";
import { Link } from "react-router-dom";
import { registerUser } from "../../Store/Auth/AuthSliceReducers";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError } from "../../Store/Auth/AuthSlice";
import { CiUser } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaPhoneAlt, FaUserCircle } from "react-icons/fa";
import FloatingInput from "../../components/FloatingInput/FloatingInput";
import LoadingButton from "../../components/LoadingButton/LoadingButton";

const Signup = () => {
  const dispatch = useDispatch();

  const { isLoading, error, userRegisterMessage } = useSelector(
    (state) => state.auth
  );
  // console.log(error);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
    if (userRegisterMessage) {
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
      });
    }
  };

  return (
    <>
      {/* Banner */}
      <section>
        <div
          style={{
            background: `linear-gradient(rgba(34, 46, 89, 0.7), rgba(7, 18, 62, 0.7)),url(${innerBannr})`,
          }}
          className="bg-cover bg-center"
        >
          <p className="text-4xl text-center text-white font-bold pt-28">
            Signup
          </p>

          {/* Breadcrumbs */}
          <div className="pb-28">
            <nav className="text-center font-bold mt-4" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2">
                <li className="inline-flex items-center">
                  <Link
                    to={"/"}
                    className="inline-flex items-center text-white hover:text-gray-300 duration-300"
                  >
                    <svg
                      className="w-3 h-3 me-2.5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="w-3 h-3 text-gray-400 mx-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <Link
                      to={"/signup"}
                      className="ms-1 text-white hover:text-gray-300 duration-300"
                    >
                      Signup
                    </Link>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </section>

      {/* Signup Form Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex justify-center gap-10 mb-10">
          <Link
            to="/signup"
            className="relative text-xl font-medium text-[#f96822] transition-all duration-300 hover:text-[#ff8a4c] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#ff8a4c] hover:after:w-full after:transition-all after:duration-300"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="relative text-xl font-medium text-gray-800 transition-all duration-300 hover:text-[#f96822] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#f96822] hover:after:w-full after:transition-all after:duration-300"
          >
            Login
          </Link>
        </div>

        <div className="max-w-xl lg:max-w-2xl w-full mx-auto bg-white rounded-xl shadow-xl p-6">
          <form onSubmit={submitHandler}>
            <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6">
              REGISTER YOUR ACCOUNT
            </h2>

            {/* Username */}
            <FloatingInput
              label="Username"
              name="name"
              icon={FaUserCircle}
              type="text"
              value={formData.name}
              onChange={handleChange}
            />

            {/* Email */}
            <FloatingInput
              label="Email"
              name="email"
              icon={MdOutlineMail}
              type="email"
              value={formData.email}
              onChange={handleChange}
            />

            {/* Password */}
            <FloatingInput
              label="Password"
              name="password"
              icon={RiLockPasswordLine}
              type="password"
              value={formData.password}
              onChange={handleChange}
            />

            {/* Phone */}
            <FloatingInput
              label="Phone 03xxxxxxxxx"
              name="phone"
              icon={FaPhoneAlt}
              type="number"
              value={formData.phone}
              onChange={handleChange}
            />

            {/* Terms */}
            <div className="flex items-center space-x-2">
              <input
                id="checkbox"
                type="checkbox"
                required
                className="w-4 h-4 text-[#f96822] border-gray-300 rounded focus:ring-[#f96822]"
              />
              <label htmlFor="checkbox" className="text-gray-900 mb-2">
                I've agreed to terms and conditions
              </label>
            </div>

            {/* Submit Button */}
            <LoadingButton isLoading={isLoading}>Register</LoadingButton>
            <div className="flex flex-col sm:flex-row justify-between mt-4 text-sm text-gray-600 text-center sm:text-left">
              <p>
                Already registered?
                <Link
                  to="/login"
                  className="text-[#f96822] hover:underline ml-1"
                >
                  Login here
                </Link>
              </p>
              <p>
                <Link
                  to="/user/forgot-password"
                  className="text-[#f96822] hover:underline"
                >
                  Forgot Password?
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Signup;
