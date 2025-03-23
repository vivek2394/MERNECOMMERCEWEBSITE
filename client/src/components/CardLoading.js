import React from "react";

const CardLoading = () => {
  return (
    <div className="border py-3 px-2 lg:p-4 grid gap-2 lg:gap-4 w-36 lg:w-52 rounded cursor-pointer bg-white animate-pulse">
      {/* Image Placeholder */}
      <div className="h-24 lg:h-32 bg-gray-200 rounded"></div>

      {/* Title Placeholder */}
      <div className="h-4 w-24 bg-gray-200 rounded"></div>

      {/* Description Lines */}
      <div className="h-3 w-full bg-gray-200 rounded"></div>
      <div className="h-3 w-16 bg-gray-200 rounded"></div>

      {/* Price and Buttons */}
      <div className="flex items-center justify-between gap-3">
        <div className="h-8 w-20 bg-gray-200 rounded"></div>
        <div className="h-8 w-20 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default CardLoading;
