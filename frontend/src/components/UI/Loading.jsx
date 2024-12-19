import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-200">
      <div className="text-center">
        {/* Loading Text */}
        <h1 className="text-3xl font-semibold text-gray-700 mb-4">
          Loading...
        </h1>

        {/* Spinner */}
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full border-t-4 border-blue-500 h-16 w-16 border-solid"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
