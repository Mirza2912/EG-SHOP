import React, { useEffect } from "react";
import AdminProductsTable from "../../components/Tables/AdminProductsTable";
import { useDispatch } from "react-redux";
import { getALlProductsAdmin } from "../../Store/Products/ProductSliceReducers";
import { getAllCategories } from "../../Store/Category/CategorySliceReducers";

const AllProducts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getALlProductsAdmin());
    dispatch(getAllCategories());
  }, []);
  return (
    <div className="min-h-[80vh] my-5 sm:my-10 md:my-14">
      <AdminProductsTable />
    </div>
  );
};

export default AllProducts;
