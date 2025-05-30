import React from "react";
import footerLogo from "../../assets/footer-logo.png";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <>
      <footer className="bg-black dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="grid grid-cols-1 gap-8 px-4 py-6 lg:py-8 md:grid-cols-3">
            <div className="mx-5">
              <h2 className="mb-6 text-3xl font-semibold text-white ">
                About Fresh Finds
              </h2>
              <p className="text-white text-md">
                FRESH FINDS - worldwide Grocery store since 2021. We sell over
                2000+ Category products on our web-site.
              </p>
              <div className="my-7">
                {/* <img src={footerLogo} className="w-13 h-10" alt="" /> */}
                <p className="text-white text-2xl">
                  <Logo />
                </p>
              </div>
              <p className="text-white my-7">Phone No +2345678</p>
            </div>

            <div className="mx-5">
              <div>
                {/* <img src={footerLogo} alt="" /> */}
                <p className="text-white text-4xl">
                  <Logo />
                </p>
              </div>
              <p className="my-7 text-white">
                Register now to get update on promotion and coupons. Dont worry!
                Its not Spam
              </p>
              <div>
                <form className="max-w-md mx-auto">
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-5"
                      placeholder="Search"
                    />
                    <button
                      type="submit"
                      className="text-white absolute end-2.5 bottom-2.5 bg-green-700 hover:bg-green-600 duration-200 font-medium rounded-lg text-sm px-4 py-2 "
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="mx-5">
              <h2 className="mb-6 text-3xl font-semibold text-white ">
                Company
              </h2>
              <ul className="text-white font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Returns
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Our Support
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Terms &amp; Service
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Checkout
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Other Issues
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <p className="text-white text-center pb-3">
              Copyright 2021 Fresh Finds | Design By Egens Labs
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
