import React, { useEffect, useRef, useState } from "react";
import innerBannr from "../../assets/inner-banner.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../Store/Auth/AuthSliceReducers";
import { toast } from "react-toastify";
import { clearError } from "../../Store/Auth/AuthSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const from = location.state?.from?.pathname || "/profile";
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

  useEffect(() => {
    if (isAuthenticated !== "") {
      toast.success(isAuthenticated);
      navigate(from, { replace: true });
    }
  }, [isAuthenticated]);

  return (
    <>
      <section>
        {/* Banner */}
        <div
          style={{
            background: `linear-gradient(rgba(34, 46, 89, 0.7), rgba(7, 18, 62, 0.7)),url(${innerBannr})`,
          }}
          className="bg-cover bg-center"
        >
          <p className="text-4xl text-center text-white font-bold pt-28">
            Login
          </p>
          {/* Breadcrumbs */}
          <div className="pb-28">
            <nav className="text-center font-bold mt-4" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                  <Link
                    to={"/"}
                    href="#"
                    className="inline-flex items-center text-white hover:text-gray-300 duration-300"
                  >
                    <svg
                      className="w-3 h-3 me-2.5"
                      aria-hidden="true"
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
                      className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
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
                      to={"/login"}
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

      {/* Registeration form - login */}
      <section className="container mx-auto flex justify-center flex-col items-center">
        <div className="flex justify-center items-center gap-3 mt-20 mb-8">
          <Link
            to={"/signup"}
            className="bg-[white] hover:bg-[#ff9763] text-xl text-black ease-in duration-300 rounded-xl px-12 py-4 my-3 shadow-2xl"
            type="button"
          >
            Register
          </Link>
          <Link
            to={"/login"}
            className=" bg-[#f96822] hover:bg-[#f96822] hover:text-white text-xl text-white ease-in duration-300 rounded-xl px-12 py-4 my-3 shadow-2xl"
            type="button"
          >
            Login
          </Link>
        </div>

        <div className="rounded-xl shadow-2xl lg:w-[75%] w-[100%] px-9 py-5 mb-5">
          <form className="mx-auto mt-4" onSubmit={handleLoginSubmit}>
            <div>
              <p className="text-3xl font-semibold text-center pb-5">
                LOGIN YOUR ACCOUNT
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
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`text-white mt-5 bg-[#f96822] hover:bg-[#f0824a] rounded-lg text-lg w-full px-5 py-6 text-center shadow-xl ${
                isLoading &&
                isLoading === true &&
                "opacity-50 cursor-not-allowed"
              }`}
            >
              Login
            </button>
            <div className="flex justify-between mt-4">
              <p className="text-sm text-gray-600">
                Not registered?
                <Link
                  to="/signup"
                  className="text-[#f96822] hover:underline ml-1"
                >
                  Register here
                </Link>
              </p>
              <p className="text-sm text-gray-600">
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
