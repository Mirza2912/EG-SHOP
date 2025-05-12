import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ChartComponent from "../../components/Charts/Charts";
import { getAllUsers } from "../../Store/Auth/AuthSliceReducers";
import { toast } from "react-toastify";
import { clearError } from "../../Store/Auth/AuthSlice";
import { getALlProductsAdmin } from "../../Store/Products/ProductSliceReducers";
import { getAllOrdersAdmin } from "../../Store/Order/OrderSliceReducer";
import { useDispatch, useSelector } from "react-redux";
import BarChart from "../../components/Charts/BarChart";
import StockDoughnutChart from "../../components/Charts/PieChart";

const DashboardHome = () => {
  const { allUsers } = useSelector((state) => state.auth);
  const { adminProducts } = useSelector((state) => state.products);
  const { allOrders } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  let outOfStock = 0;

  adminProducts &&
    adminProducts.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  let totalAmount = 0;
  allOrders &&
    allOrders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getALlProductsAdmin());
    dispatch(getAllOrdersAdmin());
  }, [dispatch]);
  return (
    <>
      <div className=" mt-10">
        <h2 className="lg:text-5xl xl:text-6xl text-4xl font-bold text-gray-700 text-center mb-3">
          Admin Dashboard
        </h2>
        <div className="flex items-center justify-center text-gray-700 gap-1 text-md font-normal">
          <Link to={"/"}>Home</Link>
          <span>/</span>
          <span>Admin dashboard</span>
        </div>
      </div>

      <div className="w-full lg:mt-7 mt-8 flex items-center justify-center md:gap-10 gap-2 text-lg font-semibold px-2 flex-wrap">
        <div className="w-[150px] h-[150px] bg-gray-900 text-white/90 text-center flex items-center justify-center flex-col rounded-full">
          <p className="text-xl">USERS</p>
          <p>{allUsers && allUsers.length}</p>
        </div>
        <div className="w-[150px] h-[150px] bg-slate-700 text-white/90 text-center flex items-center justify-center flex-col rounded-full">
          <p>PRODUCTS</p>
          <p>{adminProducts && adminProducts.length}</p>
        </div>
        <div className="w-[150px] h-[150px] bg-gray-400 text-white/90 text-center flex items-center justify-center flex-col rounded-full">
          <p>ORDERS</p>
          <p>{allOrders && allOrders.length}</p>
        </div>
        <div className="w-[150px] h-[150px] bg-slate-900 text-white/90 text-center flex items-center justify-center flex-col rounded-full">
          <p>Amount</p>
          <p>Rs.{totalAmount && totalAmount}</p>
        </div>
      </div>

      <ChartComponent />
      <BarChart />
      <StockDoughnutChart />
    </>
  );
};

export default DashboardHome;
