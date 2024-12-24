import React, { useEffect, useState } from "react";
import NoRequest from "./NoRequest";
import { API_URL } from "../../config";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const IncomingRequest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const roomId = location.state?.roomId;

  useEffect(() => {
    if (!roomId) return;

    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${API_URL}/request/users/${roomId}`, {
          withCredentials: true,
        });
        setRequests(response.data.users || []);
      } catch (err) {
        setError("Failed to load requests. Please try again.");
        console.error("Error fetching requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [roomId]);

  const handleAccept = async (renterId) => {
    try {
      await axios.post(
        `${API_URL}/relationship/accept`,
        { renterId, roomId },
        { withCredentials: true }
      );
      // Navigate to a specific page after accepting
      navigate("/landowner-rooms");
    } catch (err) {
      console.error("Error accepting request:", err);
      alert("Failed to accept request. Please try again.");
    }
  };

  const handleReject = async (renterId) => {
    try {
      await axios.post(
        `${API_URL}/relationship/reject`,
        { renterId, roomId },
        { withCredentials: true }
      );
      // Remove the rejected request from the UI
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== renterId)
      );
    } catch (err) {
      console.error("Error rejecting request:", err);
      alert("Failed to reject request. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-gray-700">Loading requests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (requests.length === 0) {
    return <NoRequest />;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Incoming Requests
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((request) => (
          <RequestCard
            key={request._id}
            request={request}
            onAccept={() => handleAccept(request._id)}
            onReject={() => handleReject(request._id)}
          />
        ))}
      </div>
    </div>
  );
};

// Separate component for a single request card
const RequestCard = ({ request, onAccept, onReject }) => {
  const {
    name,
    email,
    phoneNumber,
    dateOfBirth,
    homeAddress: { street, city, state, zipCode },
  } = request;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
      <h2 className="text-lg font-bold text-gray-700 mb-2">{name}</h2>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Email:</strong> {email}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Phone:</strong> {phoneNumber}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Date of Birth:</strong>{" "}
        {new Date(dateOfBirth).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Address:</strong> {`${street}, ${city}, ${state} - ${zipCode}`}
      </p>
      <div className="flex mt-4 space-x-4">
        <button
          onClick={onAccept}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Accept
        </button>
        <button
          onClick={onReject}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default IncomingRequest;
