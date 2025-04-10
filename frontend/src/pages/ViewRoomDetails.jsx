import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaRegHeart, FaPaperPlane, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { API_URL } from "../config";
import Loading from "../components/UI/Loading";
import Swal from "sweetalert2";

const ViewRoomDetails = () => {
  const { id: roomId } = useParams();
  const navigate = useNavigate();
  const [roomDetails, setRoomDetails] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);
  const [isEngaged, setEngaged] = useState(false)

  useEffect(() => {
    const isRequest = async () => {
      try {
        const req = await axios.get(`${API_URL}/request/${roomId}`, {
          withCredentials: true,
        });
        const isEngaged = await axios.get(`${API_URL}/relationship/engaged`, { withCredentials: true, });
        setEngaged(isEngaged.data.message);
        setHasRequested(req.data.message);
      } catch (err) {
        console.log(err);
      }
    };
    isRequest();
  }, []);

  useEffect(() => {
    const isFabRoom = async () => {
      try {
        const response = await axios(
          `${API_URL}/favourite/isFabRoom/${roomId}`,
          { withCredentials: true }
        );
        setIsFavorite(response.data ? true : false);
      } catch (err) {
        console.log(err);
      }
    };
    isFabRoom();
  }, [roomId]);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/rooms/roomDetails/${roomId}`,
          { withCredentials: true }
        );
        setRoomDetails(response.data.room);
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  const handleToggleFavorite = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/favourite/toggle/${roomId}`,
        { withCredentials: true }
      );
      toast.success(
        isFavorite ? "Removed from favourites" : "Added to favourites"
      );
    } catch (err) {
      console.log(err);
    }
    setIsFavorite((prevState) => !prevState);
  };

  const handleRequest = async () => {
    try {

      if (isEngaged) {
        toast.error("You are already occupying another room, so you can't make a request!");
        return;
      }
      // SweetAlert2 confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: hasRequested
          ? "Do you want to withdraw your request for this room?"
          : "Are you sure you want to send a request to the landowner?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, I am sure!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true, // Reverse buttons for better UX
      });

      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            `${API_URL}/request/${roomId}`,
            {},
            { withCredentials: true }
          );
          console.log(response.data);
        } catch (err) {
          console.log(err);
        }

        toast.success(
          hasRequested ? "Request withdrawn" : "Request sent to landowner"
        );
        // Toggle the request state
        setHasRequested((prevState) => !prevState);
      } else {
        toast.info("Action cancelled");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error processing request");
    }
  };

  if (!roomDetails) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Big Image */}
      <div className="mb-6">
        <img
          src={roomDetails.photos?.[0] || "https://via.placeholder.com/800"}
          alt="Room"
          className="w-full h-64 object-cover rounded-md shadow-md"
        />
      </div>

      {/* Room Details */}
      <div className="bg-white p-6 rounded-md shadow-md">
        <h1 className="font-bold mb-4 capitalize">
          House Name -
          <span className="text-red-600 text-2xl">
            {" "}
            {roomDetails.owner.houseName}
          </span>
        </h1>
        <h1 className="font-bold mb-4 capitalize">
          {roomDetails.roomType} Room -
          <span className="text-3xl"> ₹{roomDetails.rentPrice}</span>
          /month
        </h1>

        <p className="text-gray-700 mb-2">
          <span className="font-semibold text">Owner Name: </span>
          <span className="text-red-600 text-xl">{roomDetails.owner.name}</span>
        </p>

        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Address:</span>{" "}
          {roomDetails.address.street}, {roomDetails.address.city},{" "}
          {roomDetails.address.state}, {roomDetails.address.zipCode}
        </p>

        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Number of Rooms:</span>{" "}
          {roomDetails.numberOfRooms}
        </p>

        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Number of Bathrooms:</span>{" "}
          {roomDetails.numberOfBathrooms}
        </p>

        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Status:</span>{" "}
          {roomDetails.isAvailable ? (
            <span className="text-green-500">Available</span>
          ) : (
            <span className="text-red-500">Not Available</span>
          )}
        </p>

        {/* Actions */}
        <div className="mt-6 flex space-x-4">
          <button
            onClick={handleToggleFavorite}
            className="flex items-center space-x-2 py-3 px-6 text-lg md:py-2 md:px-4 md:text-base rounded-md text-white font-semibold bg-gray-800 hover:bg-gray-600"
          >
            {isFavorite ? (
              <>
                <FaHeart className="text-red-500" /> {/* Filled heart icon */}
                <span className="hidden sm:inline">
                  Remove from Favorites
                </span>{" "}
                {/* Hide on small screens */}
              </>
            ) : (
              <>
                <FaRegHeart className="text-white" /> {/* Outline heart icon */}
                <span className="hidden sm:inline">Add to Favorites</span>{" "}
                {/* Hide on small screens */}
              </>
            )}
          </button>

          {roomDetails.isAvailable === true ? (
            <>
              <button
                onClick={handleRequest}
                className="flex items-center space-x-2 py-3 px-6 text-lg md:py-2 md:px-4 md:text-base rounded-md text-white font-semibold bg-gray-800 hover:bg-gray-600"
              >
                {hasRequested ? (
                  <>
                    <FaTimes className="text-white" /> {/* Withdraw icon */}
                    <span className="hidden sm:inline">
                      Withdraw Request
                    </span>{" "}
                    {/* Hide on small screens */}
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-white" />{" "}
                    {/* Paper plane icon */}
                    <span className="hidden sm:inline">
                      Request Landowner
                    </span>{" "}
                    {/* Hide on small screens */}
                  </>
                )}
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewRoomDetails;
