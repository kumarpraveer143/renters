import React, { useState } from "react";
import { useEffect } from "react";

import { API_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NoRoomsFound from "./NoRoomsFound";

const FavouriteRoom = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const cachedRooms = localStorage.getItem("favouriteRooms");
        if (cachedRooms) {
          setRooms(JSON.parse(cachedRooms));
        }
        const response = await axios.get(`${API_URL}/favourite/myfavourite`, {
          withCredentials: true,
        });
        const fetchedRooms = response.data.rooms;
        localStorage.setItem("favouriteRooms", JSON.stringify(fetchedRooms));

        setRooms(fetchedRooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, []);

  const navigate = useNavigate();

  const handleViewRoom = (roomId) => {
    navigate(`/viewRoomsDetails/${roomId}`); // Redirect to detailed room page
  };

  if (rooms.length == 0) {
    return <NoRoomsFound />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className=" text-center text-2xl font-bold mb-5">
        My Favourite Rooms
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {rooms.map((room) => (
          <div
            key={room?._id}
            className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <img
              src={room?.photos?.[0] || "https://via.placeholder.com/150"}
              alt="Room"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {room?.roomType} - ₹{room?.rentPrice}/month
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                {room?.address?.street}, {room?.address?.city},{" "}
                {room?.address?.state}, {room?.address?.zipCode}
              </p>
              <p className="text-sm font-semibold">
                Status:
                {room?.isAvailable ? (
                  <span className="text-green-500"> Available</span>
                ) : (
                  <span className="text-red-500"> Not Available</span>
                )}
              </p>
              <button
                onClick={() => handleViewRoom(room._id)}
                className="mt-4 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                View Room
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouriteRoom;
