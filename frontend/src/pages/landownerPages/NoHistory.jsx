import React from "react";
import { FaRegSadTear } from "react-icons/fa"; // Importing the sad tear icon from React Icons
import { Link } from "react-router-dom";

const NoHistory = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <FaRegSadTear className="mx-auto text-4xl text-gray-500 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          No History Available
        </h2>
        <p className="text-gray-600 mb-4">
          It looks like there is no history to show at the moment. Please check
          back later.
        </p>
        <Link to="/my-renters">
          <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
            Go Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NoHistory;
