import React from "react";
import { FaRegSadTear } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";

const NoRoomsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        {/* Icon */}
        <FaRegSadTear className="text-blue-500 text-6xl md:text-8xl" />

        {/* Title */}
        <h1 className="mt-4 text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl">
          No Rooms Found
        </h1>

        {/* Description */}
        <p className="mt-4 text-gray-600 text-lg sm:text-xl">
          It seems there are no rooms available at the moment.
          <br className="hidden sm:block" /> Please check back later or add new
          rooms.
        </p>

        {/* Refresh Button */}
        <button className="mt-8 px-6 py-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 focus:outline-none flex items-center gap-2">
          <Link to="/dashboard">Dashboard</Link>
        </button>
      </div>
    </div>
  );
};

export default NoRoomsFound;
