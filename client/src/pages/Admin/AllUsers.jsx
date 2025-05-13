import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminUsersTable from "../../components/Tables/AdminUsersTable";
import { getAllUsers } from "../../Store/Auth/AuthSliceReducers";

const AllUsers = () => {
  const { allUsers } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 ">
      <AdminUsersTable />
    </div>
  );
};

export default AllUsers;
