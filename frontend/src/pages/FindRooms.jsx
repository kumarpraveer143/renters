import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import NoRoomsFound from "./NoRoomsFound";
import { API_URL } from "../config";

const FindRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchZip, setSearchZip] = useState("");
  const [limit, setLimit] = useState(25); // Load 25 rooms initially
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${API_URL}/rooms/availableRoom`, {
          withCredentials: true,
        });
        setRooms(response.data.message);
        setFilteredRooms(response.data.message);
      } catch (err) {
        console.error("Error fetching rooms:", err);
      }
    };
    fetchRooms();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchZip(value);

    if (value.trim() === "") {
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter((room) =>
        room.address.zipCode.includes(value.trim())
      );
      setFilteredRooms(filtered);
    }
  };

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 25);
  };

  const handleViewRoom = (roomId) => {
    navigate(`/viewRoomsDetails/${roomId}`); // Redirect to detailed room page
  };

  if (rooms.length === 0) {
    return <NoRoomsFound />;
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Find Rooms</h1>

      {/* Search Field */}
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Search by ZIP code..."
          value={searchZip}
          onChange={handleSearch}
          className="w-full p-3 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <button className="bg-gray-800 text-white p-3 rounded-r-md">
          <FiSearch className="text-lg" />
        </button>
      </div>

      {/* Room Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRooms.slice(0, limit).map((room) => (
          <div
            key={room._id}
            className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <img
              src={room.photos?.[0] || "https://via.placeholder.com/150"}
              alt="Room"
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                {room.roomType} - ₹{room.rentPrice}/month
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                {room.address.street}, {room.address.city}, {room.address.state}
                , {room.address.zipCode}
              </p>
              <p className="text-sm font-semibold">
                Status:{" "}
                {room.isAvailable ? (
                  <span className="text-green-500">Available</span>
                ) : (
                  <span className="text-red-500">Not Available</span>
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

      {/* Load More Button */}
      {limit < filteredRooms.length && (
        <div className="mt-6 text-center">
          <button
            onClick={handleLoadMore}
            className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default FindRooms;
