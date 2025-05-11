import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllOrders } from "../../Store/Order/OrderSliceReducer";
import { clearError } from "../../Store/Order/OrderSlice";
import OrdersTable from "../../components/Tables/OrderTable";

const Order = () => {
  const dispatch = useDispatch();
  const { error, order } = useSelector((state) => state.order);
  // console.log(order);

  useEffect(() => {
    dispatch(getAllOrders());
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error]);

  return (
    <div className="p-4 sm:my-10 md:my-14">
      <OrdersTable />
    </div>
  );
};

export default Order;
