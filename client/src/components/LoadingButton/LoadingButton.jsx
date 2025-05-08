// components/LoadingButton.jsx
import React from "react";

const LoadingButton = ({ isLoading, children = "Login", ...props }) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`w-full py-3 mt-2 text-lg font-medium text-white rounded-lg shadow-md transition duration-300 ${
        isLoading
          ? "bg-[#f0824a] opacity-50 cursor-not-allowed"
          : "bg-[#f96822] hover:bg-[#f0824a]"
      }`}
      {...props}
    >
      {isLoading ? (
        <div className="flex justify-center items-center">
          <svg
            className="animate-spin h-6 w-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          {/* <span className="ml-2">Logging in...</span> */}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
