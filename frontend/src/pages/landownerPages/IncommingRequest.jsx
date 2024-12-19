import React, { useEffect, useState } from "react";
import NoRequest from "./NoRequest";

import { API_URL } from "../../config";
import axios from "axios";
import { useLocation } from "react-router-dom";

const IncomingRequest = (props) => {
  // Sample data from backend
  const location = useLocation();

  let roomId = location.state.roomId;

  let [requests, setRequests] = useState([]);

  useEffect(() => {
    const user = async () => {
      let response = await axios.get(`${API_URL}/request/users/${roomId}`, {
        withCredentials: true,
      });
      setRequests(response.data.users);
    };
    user();
  });

  // Handlers for accept/reject
  const handleAccept = (id) => {
    alert(`Accepted request from user ID: ${id}`);
  };

  const handleReject = (id) => {
    alert(`Rejected request from user ID: ${id}`);
  };

  if (requests.length === 0) {
    return <NoRequest />;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Incoming Requests
      </h1>
      {requests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col"
            >
              <h2 className="text-lg font-bold text-gray-700 mb-2">
                {request.name}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Email:</strong> {request.email}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Phone:</strong> {request.phoneNumber}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Date of Birth:</strong>{" "}
                {new Date(request.dateOfBirth).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Address:</strong>{" "}
                {`${request.homeAddress.street}, ${request.homeAddress.city}, ${request.homeAddress.state} - ${request.homeAddress.zipCode}`}
              </p>
              <div className="flex mt-4 space-x-4">
                <button
                  onClick={() => handleAccept(request.id)}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(request.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No incoming requests at the moment.</p>
      )}
    </div>
  );
};

export default IncomingRequest;
