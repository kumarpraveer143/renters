import React from "react";
import { MdOutlineGroupOff } from "react-icons/md";
import { Link } from "react-router-dom";

const NoRenters = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-700">
      <div className="flex flex-col items-center text-center">
        <MdOutlineGroupOff className="text-6xl text-gray-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">No Renters Found</h1>
        <p className="text-gray-500 mb-4">
          There are currently no renters in this room.
        </p>
        <Link to="/dashboard">
          <button
            className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NoRenters;
