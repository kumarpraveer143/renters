import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { API_URL } from "../config";

const UploadRooms = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    rentPrice: "",
    roomType: "",
    numberOfRooms: "",
    numberOfBathrooms: "",
    // photos: [],
    isAvailable: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // const handleFileUpload = (e) => {
  //   const files = Array.from(e.target.files);
  //   if (files.length > 6) {
  //     alert("You can only upload up to 6 images.");
  //     return;
  //   }
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     // photos: files,
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await axios.post(`${API_URL}/rooms/`, formData, {
        withCredentials: true,
      });
      // console.log("Response:", response.data); // Handle the response

      toast.success("Room Registered Successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error("Something went wrong:", err.message); // Log detailed error
      toast.error("Something went wrong");
    }
  };

  let user = JSON.parse(localStorage.getItem("user"));
  const houseName = user?.houseName;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Room Details</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">House Name</label>
          <h1 className="text-4xl font-bold text-red-500">{houseName}</h1>
        </div>

        <div>
          <label className="block text-sm font-medium">Street Address</label>
          <input
            type="text"
            name="address.street"
            value={formData.address.street}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">City</label>
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">State</label>
            <input
              type="text"
              name="address.state"
              value={formData.address.state}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Zip Code</label>
          <input
            type="text"
            name="address.zipCode"
            value={formData.address.zipCode}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Rent Price</label>
          <input
            type="number"
            name="rentPrice"
            value={formData.rentPrice}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Room Type</label>
          <select
            name="roomType"
            value={formData.roomType}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border rounded-md"
          >
            <option value="" disabled>
              Select room type
            </option>
            <option value="single">Single</option>
            <option value="shared">Shared</option>
            <option value="studio">Studio</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Number of Rooms</label>
          <input
            type="number"
            name="numberOfRooms"
            value={formData.numberOfRooms}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Number of Bathrooms
          </label>
          <input
            type="number"
            name="numberOfBathrooms"
            value={formData.numberOfBathrooms}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border rounded-md"
          />
        </div>

        {/* <div>
          <label className="block text-sm font-medium">
            Upload Photos (Max 6)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="mt-1 block w-full"
          />
        </div> */}

        <button
          type="submit"
          className="w-full bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadRooms;
