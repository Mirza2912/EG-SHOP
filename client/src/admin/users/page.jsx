// import { useDispatch, useSelector } from "react-redux";
// import UsersTable from "../../components/users-table";
// import { getAllUsers } from "../../Store/Auth/AuthSliceReducers";
// import { useEffect, useMemo } from "react";

// export default function UsersPage() {
//   const dispatch=useDispatch();

//   const { allUsers, isLoading, error } = useSelector((state) => state.auth);
//   useEffect(()=>{
//   dispatch(getAllUsers());
//   },[dispatch])
//   const users=useMemo(()=>{
//     return allUsers?allUsers:[]
//   },[allUsers])
//   console.log("users",users);
//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Users Management</h1>
//         <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center text-sm">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-4 w-4 mr-2"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path d="M12 5v14M5 12h14" />
//           </svg>
//           Add New User
//         </button>
//       </div>

//       <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
//         <div className="flex items-center space-x-2 mb-6">
//           <div className="relative flex-1">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <circle cx="11" cy="11" r="8" />
//               <path d="m21 21-4.3-4.3" />
//             </svg>
//             <input
//               type="text"
//               placeholder="Search users..."
//               className="pl-8 bg-white w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//             />
//           </div>
//           <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm">Filter</button>
//         </div>

//         <UsersTable users={users}/>
//       </div>
//     </div>
//   )
// }

import { useDispatch, useSelector } from "react-redux";
import UsersTable from "../../components/users-table";
import {
  deleteUser,
  getAllUsers,
  userDelete,
} from "../../Store/Auth/AuthSliceReducers";
import { useEffect, useMemo, useState } from "react";

export default function UsersPage() {
  const dispatch = useDispatch();
  const { allUsers, isLoading, error } = useSelector((state) => state.auth);

  // Add state for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (!allUsers) return [];

    if (!searchQuery.trim()) return allUsers;

    return allUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allUsers, searchQuery]);
  const handleDelete = (userId) => {
    return dispatch(deleteUser(userId));
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users Management</h1>
        {/* <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md flex items-center text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add New User
        </button> */}
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center space-x-2 mb-6">
          <div className="relative flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search users..."
              className="pl-8 bg-white w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm">
            Filter
          </button>
        </div>

        <UsersTable users={filteredUsers} />
      </div>
    </div>
  );
}
