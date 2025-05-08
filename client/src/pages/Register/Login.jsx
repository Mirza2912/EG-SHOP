import React, { useEffect, useRef, useState } from "react";
import innerBannr from "../../assets/inner-banner.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../Store/Auth/AuthSliceReducers";
import { toast } from "react-toastify";
import { clearError } from "../../Store/Auth/AuthSlice";
import { FiUser } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import FloatingInput from "../../components/FloatingInput/FloatingInput";
import LoadingButton from "../../components/LoadingButton/LoadingButton";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const [isFocused, setIsFocused] = useState(null);

  const from = location.state?.from?.pathname || "/";
  // console.log(location);

  const { isLoading, error, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(formData));
    if (isAuthenticated !== "") {
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  const toastShownRef = useRef(false);
  useEffect(() => {
    if (isAuthenticated !== "" && toastShownRef.current === false) {
      toast.success(isAuthenticated);
      toastShownRef.current = true;
      navigate(from, { replace: true });
    }
  }, [isAuthenticated]);

  return (
    <>
      <section className="w-full">
        {/* Banner */}
        <div
          style={{
            background: `linear-gradient(rgba(34, 46, 89, 0.7), rgba(7, 18, 62, 0.7)),url(${innerBannr})`,
          }}
          className="bg-cover bg-center"
        >
          <p className="text-3xl md:text-4xl text-center text-white font-bold pt-20 md:pt-28">
            Login
          </p>

          {/* Breadcrumb */}
          <div className="pb-20 md:pb-28">
            <nav className="text-center font-bold mt-4" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse text-sm">
                <li className="inline-flex items-center">
                  <Link
                    to="/"
                    className="inline-flex items-center text-white hover:text-gray-300 duration-300"
                  >
                    <svg
                      className="w-3 h-3 me-2.5"
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
                      className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        d="m1 9 4-4-4-4"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    <Link
                      to="/login"
                      className="ms-1 text-white hover:text-gray-300 duration-300"
                    >
                      Login
                    </Link>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </section>

      <section className="w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Tabs */}
        <div className="flex justify-center gap-10 mb-10">
          <Link
            to="/login"
            className="relative text-xl font-medium text-[#f96822] transition-all duration-300 hover:text-[#ff8a4c] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#ff8a4c] hover:after:w-full after:transition-all after:duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="relative text-xl font-medium text-gray-800 transition-all duration-300 hover:text-[#f96822] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#f96822] hover:after:w-full after:transition-all after:duration-300"
          >
            Register
          </Link>
        </div>

        {/* Form Box */}
        <div className="max-w-xl lg:max-w-2xl w-full mx-auto bg-white rounded-xl shadow-xl p-6">
          <form onSubmit={handleLoginSubmit}>
            <p className="text-2xl sm:text-3xl font-semibold text-center mb-6">
              LOGIN YOUR ACCOUNT
            </p>

            {/* email  */}
            <FloatingInput
              label="Email"
              name="email"
              icon={MdOutlineMail}
              type="email"
              value={formData.email}
              onChange={handleChange}
            />

            {/* password  */}
            <FloatingInput
              label="Password"
              name="password"
              icon={RiLockPasswordLine}
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <LoadingButton isLoading={isLoading}>Login</LoadingButton>

            <div className="flex flex-col sm:flex-row justify-between mt-4 text-sm text-gray-600 text-center sm:text-left">
              <p>
                Not registered?
                <Link
                  to="/signup"
                  className="text-[#f96822] hover:underline ml-1"
                >
                  Register here
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

export default Login;
