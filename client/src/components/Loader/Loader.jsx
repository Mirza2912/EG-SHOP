import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-t-[#f96822] border-gray-300 animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-t-[#f96822] border-gray-200 animate-spin-slow"></div>
      </div>
    </div>
  );
};

export default Loader;
