import React, { useEffect, useState } from "react";
import { FaHistory, FaMoneyBillWave, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../../config";

const MyRenters = () => {
  const [renters, setRenters] = useState([]);

  useEffect(() => {
    const data = async () => {
      let response = await axios.get(`${API_URL}/relationship/getRenters`, {
        withCredentials: true,
      });
      setRenters(response.data.renters);
    };
    data();
  }, []);

  const handleCheckHistory = () => {
    console.log("Check History button clicked");
  };

  const handleAddRent = () => {
    console.log("Add Rent button clicked");
  };

  const handleRemoveRenter = () => {
    console.log("Remove Renter button clicked");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        My Renters
      </h1>
      <div className="space-y-4">
        {renters.map((renter) => (
          <div
            key={renter.relationId}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row md:items-start md:justify-between"
          >
            <div className="text-left">
              <h2 className="text-2xl mb-3 font-semibold text-gray-800">
                {renter.renterDetails.name}
              </h2>

              <p className="text-gray-600">
                Email: {renter.renterDetails.email}
              </p>
              <p className="text-gray-600">
                Phone: {renter.renterDetails.phoneNumber}
              </p>
              <p className="text-gray-600">
                Date of Birth:{" "}
                {new Date(
                  renter.renterDetails.dateOfBirth
                ).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                Address: {renter.renterDetails.homeAddress.street},{" "}
                {renter.renterDetails.homeAddress.city},{" "}
                {renter.renterDetails.homeAddress.state} -{" "}
                {renter.renterDetails.homeAddress.zipCode}
              </p>
              <div className="mt-4">
                <span className="text-red-600 font-bold">
                  {renter.roomDetails.roomType} room
                </span>
                <br></br>
                <span className="text-2xl font-bold">
                  Rent Price : ₹{renter.roomDetails.rentPrice}
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <button
                className="relative flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 md:px-6 md:justify-start group"
                onClick={handleCheckHistory}
              >
                <FaHistory className="mr-2" />
                <span className="hidden md:inline">Check History</span>
                <span className="absolute hidden group-hover:inline text-xs bg-black text-white rounded px-2 py-1 bottom-full mb-1">
                  Check History
                </span>
              </button>
              <button
                className="relative flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 md:px-6 md:justify-start group"
                onClick={handleAddRent}
              >
                <FaMoneyBillWave className="mr-2" />
                <span className="hidden md:inline">Add Rent</span>
                <span className="absolute hidden group-hover:inline text-xs bg-black text-white rounded px-2 py-1 bottom-full mb-1">
                  Add Rent
                </span>
              </button>
              <button
                className="relative flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 md:px-6 md:justify-start group"
                onClick={handleRemoveRenter}
              >
                <FaTrashAlt className="mr-2" />
                <span className="hidden md:inline">Remove Renter</span>
                <span className="absolute hidden group-hover:inline text-xs bg-black text-white rounded px-2 py-1 bottom-full mb-1">
                  Remove Renter
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRenters;
