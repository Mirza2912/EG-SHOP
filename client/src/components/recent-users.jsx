"use client"

import { useState } from "react"

export default function RecentUsers() {
  const users = [
    { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "Customer", status: "Active" },
    { id: 2, name: "Sarah Williams", email: "sarah@example.com", role: "Admin", status: "Active" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", role: "Customer", status: "Inactive" },
    { id: 4, name: "Emily Davis", email: "emily@example.com", role: "Customer", status: "Active" },
  ]

  const [dropdownOpen, setDropdownOpen] = useState(null)

  const toggleDropdown = (userId) => {
    if (dropdownOpen === userId) {
      setDropdownOpen(null)
    } else {
      setDropdownOpen(userId)
    }
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-500 border-b">
              <th className="font-medium text-left pb-3">User</th>
              <th className="font-medium text-left pb-3">Role</th>
              <th className="font-medium text-left pb-3">Status</th>
              <th className="font-medium text-right pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b last:border-0">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3">
                  <span className="text-sm">{user.role}</span>
                </td>
                <td className="py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <div className="relative">
                    <button onClick={() => toggleDropdown(user.id)} className="p-1 rounded-md hover:bg-gray-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                      </svg>
                      <span className="sr-only">Open menu</span>
                    </button>
                    {dropdownOpen === user.id && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1" role="menu" aria-orientation="vertical">
                          <button
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            role="menuitem"
                          >
                            View details
                          </button>
                          <button
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            role="menuitem"
                          >
                            Edit user
                          </button>
                          <button
                            className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                            role="menuitem"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center">
        <button className="border border-gray-300 text-orange-500 px-4 py-2 rounded-md text-sm hover:bg-gray-50">
          View All Users
        </button>
      </div>
    </div>
  )
}
