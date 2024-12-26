import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaHistory,
  FaHome,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";

const RenterMyRoom = () => {
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);

  const handleCheckHistory = (roomId) => {
    navigate("/renter-history");
  };

  useEffect(() => {
    const getRoomDetails = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/relationship/getRoomDetails`,
          {
            withCredentials: true,
          }
        );
        setRoom(response.data.room);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };

    getRoomDetails();
  }, []);

  if (!room) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        Loading...
      </div>
    );
  }

  const { houseName, ownerNumber, ownerName, ownerEmail, roomDetails } = room;
  const {
    address,
    rentPrice,
    roomType,
    numberOfRooms,
    numberOfBathrooms,
    roomNumber,
  } = roomDetails;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Room Details
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-red-600 flex items-center mb-4">
          <FaHome className="mr-2" /> {houseName}
        </h2>

        {/* Owner Details Section */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-700 mb-4">
            Owner Details
          </h3>
          <p className="text-gray-600 flex items-center">
            <FaUser className="mr-2 text-blue-500" />
            <strong className="mr-2">Name:</strong> {ownerName}
          </p>
          <p className="text-gray-600 flex items-center mt-1">
            <FaEnvelope className="mr-2 text-green-500" />
            <strong className="mr-2">Email:</strong> {ownerEmail}
          </p>
          <p className="text-gray-600 flex items-center mt-1">
            <FaPhone className="mr-2 text-red-500" />
            <strong className="mr-2">Contact:</strong> {ownerNumber}
          </p>
          <p className="text-gray-600 flex items-center mt-1">
            <FaMapMarkerAlt className="mr-2 text-orange-500" />
            <strong className="mr-2">Address:</strong> {address.street},{" "}
            {address.city}, {address.state} - {address.zipCode}
          </p>
        </div>

        {/* Room Details Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-700 mb-4">Room Details</h3>
          <p className="text-gray-600 text-lg flex items-center">
            <strong className="text-xl mr-2">Room Number:</strong> {roomNumber}
          </p>
          <p className="text-gray-600 text-lg flex items-center">
            <strong className="text mr-2">Type:</strong> {roomType}
          </p>
          <p className="text-gray-600 text-lg flex items-center">
            <strong className="text mr-2">Number of Rooms:</strong>{" "}
            {numberOfRooms}
          </p>
          <p className=" text-gray-600 flex items-center">
            <strong className="mr-2">Number of Bathrooms:</strong>{" "}
            {numberOfBathrooms}
          </p>
          <p className="text-gray-600 text-xl font-bold flex items-center mt-2">
            Rent Price:
            <span className="ml-2 text-green-600 text-2xl">₹{rentPrice}</span>
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex justify-end">
          <button
            className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            onClick={() => handleCheckHistory(roomDetails._id)}
          >
            <FaHistory className="mr-2" />
            Check History
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenterMyRoom;
