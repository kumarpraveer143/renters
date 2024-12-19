import React from "react";
import { FaInbox } from "react-icons/fa";
import { Link } from "react-router-dom";

const NoRequest = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-gray-100 text-gray-800 p-6 rounded-full mb-6">
        <FaInbox className="w-20 h-20 md:w-24 md:h-24" />
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        No Incoming Requests
      </h1>
      <p className="text-gray-600 text-center max-w-md mb-6">
        You currently have no incoming requests. Once new requests arrive, they
        will appear here.
      </p>
      <button className="bg-gray-800 text-white py-2 px-6 rounded hover:bg-gray-600 flex items-center">
        <FaInbox className="mr-2" />
        <Link to="/landowner-rooms">Go Back My Rooms</Link>
      </button>
    </div>
  );
};

export default NoRequest;
