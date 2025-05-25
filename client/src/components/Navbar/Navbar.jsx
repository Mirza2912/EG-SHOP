import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoCartOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { userLogOut } from "../../Store/Auth/AuthSliceReducers";
import Login from "../../pages/Register/Login";
import Logo from "../Logo/Logo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const { cartItems } = useSelector((state) => state.cart);
  // console.log(cartItems.length);

  const handleToggleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(userLogOut());
  };

  return (
    <div>
      <header className="bg-[#F0F2F5] relative border-b-2 border-gray-200">
        <div className="container mx-auto flex justify-between py-5 px-5 lg:px-16 md:px-8  items-center">
          {/* Logo */}
          <Link to={"/"}>
            {/* <img src={logo} /> */}

            <Logo />
          </Link>

          {/* Toggle btn */}
          {isMenuOpen ? (
            <AiOutlineClose
              onClick={handleToggleClick}
              className="text-black text-2xl block md:hidden"
            />
          ) : (
            <AiOutlineMenu
              onClick={handleToggleClick}
              className="text-black text-2xl block md:hidden"
            />
          )}

          {/* Nav Items */}
          <ul className="hidden md:flex items-center text-lg justify-center">
            <Link
              to={"/"}
              className="mr-5 text-gray-500 hover:text-[#f98662] cursor-pointer"
            >
              Home
            </Link>
            <Link
              to={"/shop"}
              className="mr-5 text-gray-500 hover:text-[#f98662] cursor-pointer"
            >
              Shop
            </Link>

            <Link
              to={"/about"}
              className="mr-5 relative text-gray-500 hover:text-[#f98662] cursor-pointer flex justify-center items-center"
            >
              About
            </Link>
            <Link
              to={"/contact"}
              className="mr-5 text-gray-500 hover:text-[#f98662] cursor-pointer"
            >
              Contact
            </Link>
            {isAuthenticated === "" ? (
              <>
                <Link
                  to={"/signup"}
                  className="mr-5 text-gray-500 hover:text-[#f98662] cursor-pointer"
                >
                  Sign up
                </Link>
                <Link
                  to={"/login"}
                  className="mr-5 text-gray-500 hover:text-[#f98662] cursor-pointer"
                >
                  Sign in
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={"/profile"}
                  className="mr-5 text-gray-500 hover:text-[#f98662] cursor-pointer"
                >
                  Profile
                </Link>

                {/* <Link
                  onClick={handleLogout}
                  className="mr-5 text-gray-500 hover:text-[#f98662] cursor-pointer"
                >
                  Log out
                </Link>
                <Link
                  to={"/user/orders"}
                  className="mr-5 text-gray-500 hover:text-[#f98662] cursor-pointer"
                >
                  Orders
                </Link> */}
              </>
            )}
            {isAuthenticated !== "" && user?.user?.role === "user" ? (
              <Link
                to={"/chat"}
                className="mr-5 text-gray-500 hover:text-[#f98662] cursor-pointer"
              >
                Chat
              </Link>
            ) : (
              <></>
            )}
          </ul>

          {/* Contact nav */}
          <div className="hidden md:flex  justify-center items-center gap-7">
            <div className="relative  w-7 h-7">
              <p className="absolute bottom-5 text-center pt-0.5 -right-4 w-full h-full rounded-full bg-[#f96822]">
                {cartItems?.length > 0 ? cartItems?.length : 0}
              </p>
              <Link
                to={"/cart"}
                className="text-3xl text-gray-500 hover:text-[#f98662] cursor-pointer"
              >
                <IoCartOutline />
              </Link>
            </div>
            <div className="relative">
              <Link
                to={"/cart"}
                className="text-3xl text-gray-500 hover:text-[#f98662] cursor-pointer"
              >
                <IoSearchOutline />
              </Link>
            </div>
          </div>

          {/* Responsive Menu */}
          {isMenuOpen && (
            <div className="absolute flex flex-col items-center w-[100%] h-[calc(100vh-74px)] justify-center gap-10 top-[74px] left-0 bg-white  md:hidden z-50">
              <Link
                to={"/"}
                className="block text-gray-800 hover:text-[#f98662] font-semibold mb-2 "
              >
                Home
              </Link>
              <Link
                to={"/shop"}
                className="block hover:text-[#f98662] text-gray-800 font-semibold mb-2 "
              >
                Shop
              </Link>
              <Link
                to={"/cart"}
                className="block hover:text-[#f98662] text-gray-800 font-semibold mb-2 "
              >
                Cart
              </Link>
              <Link
                to={"/about"}
                className="block hover:text-[#f98662] text-gray-800 font-semibold mb-2  relative"
              >
                About
              </Link>
              <Link
                to={"/contact"}
                className="block text-gray-800 font-semibold mb-2 hover:text-[#f98662]"
              >
                Contact
              </Link>
              <div className=" flex  justify-center items-center gap-7">
                <div className="relative  w-7 h-7">
                  <p className="absolute bottom-5 text-center pt-0.5 -right-4 w-full h-full rounded-full bg-[#f96822]">
                    4
                  </p>
                  <Link
                    to={"/cart"}
                    className="text-3xl text-gray-500 hover:text-[#f98662] cursor-pointer"
                  >
                    <IoCartOutline />
                  </Link>
                </div>
                <div className="relative">
                  <Link
                    to={"/cart"}
                    className="text-3xl text-gray-500 hover:text-[#f98662] cursor-pointer"
                  >
                    <IoSearchOutline />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;

// import { Fragment } from "react";
// import { Disclosure, Menu, Transition } from "@headlessui/react";
// import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
// import logo from "../../assets/logo.png";

// const navigation = [
//   { name: "Dashboard", href: "#", current: true },
//   { name: "Team", href: "#", current: false },
//   { name: "Projects", href: "#", current: false },
//   { name: "Calendar", href: "#", current: false },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function Navbar() {
//   return (
//     <Disclosure as="nav" className="bg-[#F0F2F5]">
//       {({ open }) => (
//         <>
//           <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//             <div className="relative flex h-16 items-center justify-between">
//               <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//                 {/* Mobile menu button*/}
//                 <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
//                   <span className="absolute -inset-0.5" />
//                   <span className="sr-only">Open main menu</span>
//                   {open ? (
//                     <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//                   ) : (
//                     <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//                   )}
//                 </Disclosure.Button>
//               </div>
//               {/* NavBar */}
//               <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//                 {/* Logo */}
//                 <div className="flex flex-shrink-0 items-center">
//                   <img className="h-8 w-auto" src={logo} alt="Your Company" />
//                 </div>
//                 {/* NavItems */}
//                 <div className="hidden sm:ml-6 sm:block">
//                   <div className="flex space-x-4">
//                     <a
//                       href="/"
//                       className="text-gray-600 hover:text-[#f98662] px-3 py-2 text-sm font-medium"
//                     >
//                       Home
//                     </a>
//                     <a
//                       href="/"
//                       className="text-gray-600 hover:text-[#f98662] px-3 py-2 text-sm font-medium"
//                     >
//                       Shop
//                     </a>
//                     <a
//                       href="/"
//                       className="text-gray-600 hover:text-[#f98662] px-3 py-2 text-sm font-medium"
//                     >
//                       Pages
//                     </a>
//                     <a
//                       href="/"
//                       className="text-gray-600 hover:text-[#f98662] px-3 py-2 text-sm font-medium"
//                     >
//                       Contact
//                     </a>
//                     {/* {navigation.map((item) => (
//                       <a
//                         key={item.name}
//                         href={item.href}
//                         className={classNames(
//                           item.current
//                             ? " text-grey-700"
//                             : "text-gray-600  hover:text-black",
//                           "rounded-md px-3 py-2 text-sm font-medium"
//                         )}
//                         aria-current={item.current ? "page" : undefined}
//                       >
//                         {item.name}
//                       </a>
//                     ))} */}
//                   </div>
//                 </div>
//                 {/* <div className="hidden sm:ml-6 sm:block">
//                   <p>Hotline Number</p>
//                   <p>123456</p>
//                 </div> */}
//               </div>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//                 {/* Profile dropdown */}
//                 {/* <Menu as="div" className="relative ml-3">
//                   <div>
//                     <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                       <span className="absolute -inset-1.5" />
//                       <span className="sr-only">Open user menu</span>
//                       <img
//                         className="h-8 w-8 rounded-full"
//                         src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                         alt=""
//                       />
//                     </Menu.Button>
//                   </div>
//                   <Transition
//                     as={Fragment}
//                     enter="transition ease-out duration-100"
//                     enterFrom="transform opacity-0 scale-95"
//                     enterTo="transform opacity-100 scale-100"
//                     leave="transition ease-in duration-75"
//                     leaveFrom="transform opacity-100 scale-100"
//                     leaveTo="transform opacity-0 scale-95"
//                   >
//                     <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                       <Menu.Item>
//                         {({ active }) => (
//                           <a
//                             href="#"
//                             className={classNames(
//                               active ? "bg-gray-100" : "",
//                               "block px-4 py-2 text-sm text-gray-700"
//                             )}
//                           >
//                             Your Profile
//                           </a>
//                         )}
//                       </Menu.Item>
//                       <Menu.Item>
//                         {({ active }) => (
//                           <a
//                             href="#"
//                             className={classNames(
//                               active ? "bg-gray-100" : "",
//                               "block px-4 py-2 text-sm text-gray-700"
//                             )}
//                           >
//                             Settings
//                           </a>
//                         )}
//                       </Menu.Item>
//                       <Menu.Item>
//                         {({ active }) => (
//                           <a
//                             href="#"
//                             className={classNames(
//                               active ? "bg-gray-100" : "",
//                               "block px-4 py-2 text-sm text-gray-700"
//                             )}
//                           >
//                             Sign out
//                           </a>
//                         )}
//                       </Menu.Item>
//                     </Menu.Items>
//                   </Transition>
//                 </Menu> */}
//               </div>
//             </div>
//           </div>

//           {/* Mobile View - Nav Items */}
//           <Disclosure.Panel className="sm:hidden">
//             <div className="space-y-1 px-2 pb-3 pt-2">
//               <a
//                 href="/"
//                 className="text-gray-600 block hover:text-[#f98662] px-3 py-2 text-sm font-medium"
//               >
//                 Home
//               </a>
//               <a
//                 href="/"
//                 className="text-gray-600 block hover:text-[#f98662] px-3 py-2 text-sm font-medium"
//               >
//                 Shop
//               </a>
//               <a
//                 href="/"
//                 className="text-gray-600 block hover:text-[#f98662] px-3 py-2 text-sm font-medium"
//               >
//                 Pages
//               </a>
//               <a
//                 href="/"
//                 className="text-gray-600 block hover:text-[#f98662] px-3 py-2 text-base font-medium"
//               >
//                 Contact
//               </a>
//               {/* {navigation.map((item) => (
//                 <Disclosure.Button
//                   key={item.name}
//                   as="a"
//                   href={item.href}
//                   className={classNames(
//                     item.current
//                       ? "bg-gray-900 text-white"
//                       : "text-gray-300 hover:bg-gray-700 hover:text-white",
//                     "block rounded-md px-3 py-2 text-base font-medium"
//                   )}
//                   aria-current={item.current ? "page" : undefined}
//                 >
//                   {item.name}
//                 </Disclosure.Button>
//               ))} */}
//             </div>
//           </Disclosure.Panel>
//         </>
//       )}
//     </Disclosure>
//   );
// }
