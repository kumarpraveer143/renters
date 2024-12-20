import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NoRoomsFound from "../NoRoomsFound";
import { API_URL } from "../../config";
import Swal from "sweetalert2";
import { FaBell, FaEdit, FaSave, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LandOwnerRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${API_URL}/rooms/myRoom`, {
          withCredentials: true,
        });
        setRooms(response.data.message);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        toast.error("Something went wrong!");
      }
    };

    fetchRooms();
  }, []);

  const handleEditClick = (roomId) => {
    setEditingRoom(roomId);
  };

  const handleSaveClick = async (roomId) => {
    const updatedRoom = rooms.find((room) => room._id === roomId);
    // console.log("Updated Room Data:", updatedRoom);

    try {
      const response = await axios.put(
        `${API_URL}/rooms/${roomId}`,
        updatedRoom,
        {
          withCredentials: true,
        }
      );

      // console.log("API Response:", response.data);
      toast.success("Room updated successfully!");
    } catch (error) {
      console.error("Error updating room:", error);
      toast.error("Failed to update the room!");
    }

    setEditingRoom(null);
  };

  const handleDeleteClick = async (roomId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${API_URL}/rooms/${roomId}`, {
            withCredentials: true,
          });
          toast.success("Room Deleted Successfully!");
          // console.log(response.data);

          // Update the rooms state after deletion
          setRooms(rooms.filter((room) => room._id !== roomId));
        } catch (err) {
          toast.error("Something went wrong!");
          console.log(err);
        }
      } else {
        toast.info("Deletion cancelled");
      }
    });
  };

  const handleIncomingRequest = (roomId) => {
    navigate("/incoming-request", { state: { roomId } });
  };

  const handleAddressChange = (e, field) => {
    const { value } = e.target;
    setRooms(
      rooms.map((room) => {
        if (room._id === editingRoom) {
          return {
            ...room,
            address: {
              ...room.address,
              [field]: value,
            },
          };
        }
        return room;
      })
    );
  };

  const handleAvailabilityChange = (e, roomId) => {
    const { checked } = e.target;
    setRooms(
      rooms.map((room) => {
        if (room._id === roomId) {
          return { ...room, isAvailable: checked };
        }
        return room;
      })
    );
  };

  if (rooms.length === 0) {
    return <NoRoomsFound />;
  }

  return (
    <div className="p-6 grid grid-cols-1 gap-6">
      {rooms.map((room) => (
        <div
          key={room._id}
          className="w-full bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="p-5">
            <h3 className="text-xl font-semibold text-gray-800">
              Room Type: {room.roomType}
            </h3>

            {/* Address Fields */}
            {editingRoom === room._id ? (
              <>
                <input
                  type="text"
                  value={room.address.street}
                  onChange={(e) => handleAddressChange(e, "street")}
                  className="mt-2 p-2 border border-gray-300 rounded w-full"
                  placeholder="Street"
                />
                <input
                  type="text"
                  value={room.address.city}
                  onChange={(e) => handleAddressChange(e, "city")}
                  className="mt-2 p-2 border border-gray-300 rounded w-full"
                  placeholder="City"
                />
                <input
                  type="text"
                  value={room.address.state}
                  onChange={(e) => handleAddressChange(e, "state")}
                  className="mt-2 p-2 border border-gray-300 rounded w-full"
                  placeholder="State"
                />
                <input
                  type="text"
                  value={room.address.zipCode}
                  onChange={(e) => handleAddressChange(e, "zipCode")}
                  className="mt-2 p-2 border border-gray-300 rounded w-full"
                  placeholder="Zip Code"
                />
              </>
            ) : (
              <p className="text-gray-600 mt-2">
                Address: {room.address.street}, {room.address.city},{" "}
                {room.address.state}, {room.address.zipCode}
              </p>
            )}

            {/* Rent Price */}
            {editingRoom === room._id ? (
              <input
                type="number"
                value={room.rentPrice}
                onChange={(e) => handleChange(e, "rentPrice")}
                className="mt-2 p-2 border border-gray-300 rounded w-full"
              />
            ) : (
              <p className="text-gray-600 mt-2">
                Rent Price: ₹{room.rentPrice}
              </p>
            )}

            {/* Room Type */}
            {editingRoom === room._id ? (
              <select
                value={room.roomType}
                onChange={(e) => handleChange(e, "roomType")}
                className="mt-2 p-2 border border-gray-300 rounded w-full"
              >
                <option value="single">Single</option>
                <option value="shared">Shared</option>
                <option value="studio">Studio</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
              </select>
            ) : (
              <p className="text-gray-600 mt-2">Room Type: {room.roomType}</p>
            )}

            {/* Number of Rooms and Bathrooms */}
            {editingRoom === room._id ? (
              <input
                placeholder="Number of Rooms"
                type="number"
                value={room.numberOfRooms}
                onChange={(e) => handleChange(e, "numberOfRooms")}
                className="mt-2 p-2 border border-gray-300 rounded w-full"
              />
            ) : (
              <p className="text-gray-600 mt-2">Rooms: {room.numberOfRooms}</p>
            )}

            {editingRoom === room._id ? (
              <input
                placeholder="Number of Bathroom"
                type="number"
                value={room.numberOfBathrooms}
                onChange={(e) => handleChange(e, "numberOfBathrooms")}
                className="mt-2 p-2 border border-gray-300 rounded w-full"
              />
            ) : (
              <p className="text-gray-600 mt-2">
                Bathrooms: {room.numberOfBathrooms}
              </p>
            )}

            {/* Availability Status Display */}
            <p className="mt-2">
              <strong>Status: </strong>
              {room.isAvailable ? (
                <span className="text-green-500">Available</span>
              ) : (
                <span className="text-red-500">Not Available</span>
              )}
            </p>

            {/* Availability Checkbox */}
            {editingRoom === room._id && (
              <div className="mt-2">
                <label className="text-gray-600">Available: </label>
                <input
                  type="checkbox"
                  checked={room.isAvailable}
                  onChange={(e) => handleAvailabilityChange(e, room._id)}
                  className="ml-2"
                />
              </div>
            )}
          </div>

          <div className="bg-gray-100 p-4 flex items-center">
            {editingRoom === room._id ? (
              <button
                onClick={() => handleSaveClick(room._id)}
                className="bg-green-500 text-white py-2 px-4 mr-4 rounded hover:bg-green-600 flex items-center"
              >
                <FaSave className="mr-2" />
                <span className="hidden sm:inline">Save Room</span>
              </button>
            ) : (
              <button
                onClick={() => handleEditClick(room._id)}
                className="bg-gray-800 text-white py-2 px-4 mr-4 rounded hover:bg-blue-600 flex items-center"
              >
                <FaEdit className="mr-2" />
                <span className="hidden sm:inline">Edit Room</span>
              </button>
            )}
            <button
              onClick={() => handleDeleteClick(room._id)}
              className="bg-red-500 text-white py-2 px-4 mr-4 rounded hover:bg-red-600 flex items-center"
            >
              <FaTrash className="mr-2" />
              <span className="hidden sm:inline">Delete Room</span>
            </button>
            {room.isAvailable === true ? (
              <>
                <button
                  onClick={() => handleIncomingRequest(room._id)}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 flex items-center"
                >
                  <FaBell className="mr-2" />
                  <span className="hidden sm:inline">Incoming Request</span>
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LandOwnerRooms;
