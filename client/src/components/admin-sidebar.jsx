"use client"

import { Link, useLocation } from "react-router-dom"

export default function AdminSidebar({route,setRoute}) {
    const location = useLocation()
    const pathname = location.pathname

  const isActive = (path) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-orange-500">FreshFinds</h1>
        <p className="text-sm text-gray-500">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <button
          onClick={() => setRoute("dashboard")}
          className={`flex items-center px-4 py-3 rounded-lg text-sm w-full ${
            // isActive("/admin") && pathname === "/testadmin"
            route == "dashboard"
              ? "bg-orange-50 text-orange-500"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-3 h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="6" height="6" />
            <rect x="16" y="2" width="6" height="6" />
            <rect x="2" y="16" width="6" height="6" />
            <rect x="16" y="16" width="6" height="6" />
          </svg>
          Dashboard
        </button>

        <button
        onClick={() => setRoute("users")}
          className={`flex items-center px-4 py-3 rounded-lg text-sm w-full ${
            route=="users" ? "bg-orange-50 text-orange-500" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-3 h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Users
        </button>

        <button
          onClick={() => setRoute("products")}
          
          className={`flex items-center px-4 py-3 rounded-lg text-sm w-full ${
            route=="products" ? "bg-orange-50 text-orange-500" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-3 h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          Products
        </button>
      </nav>

      <div className="p-4 border-t mt-auto">
        <button
          onClick={() => setRoute("settings")}
          className={`flex items-center px-4 py-3 rounded-lg text-sm w-full ${
            route=="settings" ? "bg-orange-50 text-orange-500" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-3 h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          Settings
        </button>

        <button className="flex items-center px-4 py-3 rounded-lg text-sm text-gray-700 hover:bg-gray-100 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-3 h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  )
}
