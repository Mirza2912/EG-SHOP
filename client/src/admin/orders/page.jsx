import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersAdmin } from "../../Store/Order/OrderSliceReducer";
import Loader from "../../components/Loader/Loader";
import OrdersTable from "../../components/orders-table";

const page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersAdmin());
  }, []);
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Orders Management</h1>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <OrdersTable />
      </div>
    </div>
  );
};

export default page;
