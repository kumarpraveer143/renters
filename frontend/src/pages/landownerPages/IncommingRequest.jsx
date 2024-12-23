import React, { useEffect, useState } from "react";
import NoRequest from "./NoRequest";

import { API_URL } from "../../config";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const IncomingRequest = (props) => {
  // Sample data from backend
  const location = useLocation();
  const navigate = useNavigate();

  let [requests, setRequests] = useState([]);

  useEffect(() => {
    let roomId = location.state.roomId;
    const user = async () => {
      let response = await axios.get(`${API_URL}/request/users/${roomId}`, {
        withCredentials: true,
      });
      setRequests(response.data.users);
    };
    user();
  }, [requests]);

  // Handlers for accept/reject
  const handleAccept = async (id) => {
    let roomId = location.state.roomId;
    try {
      const response = await axios.post(
        `${API_URL}/relationship/accept`,
        {
          renterId: id,
          roomId,
        },
        { withCredentials: true }
      );
      navigate("/landowner-rooms");
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = async (id) => {
    let roomId = location.state.roomId;
    let renterId = id;
    try {
      const response = await axios.post(
        `${API_URL}/relationship/reject`,
        {
          renterId,
          roomId,
        },
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {requests.length > 0 ? (
        <div>
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Incoming Requests
          </h1>
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
                    onClick={() => handleAccept(request._id)}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(request._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <NoRequest />
      )}
    </div>
  );
};

export default IncomingRequest;
