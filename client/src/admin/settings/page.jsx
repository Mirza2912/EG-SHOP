"use client"

import { useState } from "react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div>
        <div className="border-b border-gray-200 mb-4">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("general")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "general"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab("appearance")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "appearance"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Appearance
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "notifications"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Notifications
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "security"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Security
            </button>
          </nav>
        </div>

        {activeTab === "general" && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="site-name" className="block text-sm font-medium text-gray-700">
                  Site Name
                </label>
                <input
                  id="site-name"
                  defaultValue="FreshFinds"
                  className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="site-url" className="block text-sm font-medium text-gray-700">
                  Site URL
                </label>
                <input
                  id="site-url"
                  defaultValue="https://freshfinds.com"
                  className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700">
                  Admin Email
                </label>
                <input
                  id="admin-email"
                  type="email"
                  defaultValue="admin@freshfinds.com"
                  className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm">
                Save Changes
              </button>
            </form>
          </div>
        )}

        {activeTab === "appearance" && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Appearance Settings</h2>
            {/* Appearance settings content */}
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
            {/* Notification settings content */}
          </div>
        )}

        {activeTab === "security" && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
            {/* Security settings content */}
          </div>
        )}
      </div>
    </div>
  )
}
