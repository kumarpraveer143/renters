import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
import Loading from "../components/UI/Loading";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Fetch user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData(parsedUser);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      homeAddress: {
        ...prevData.homeAddress,
        [name]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/users/editprofile`,
        formData,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("user", JSON.stringify(formData));
      setUser(formData);
      console.log(formData);
      toast.success("Updated Successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Something went wrong!");
    }
  };

  if (!user)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg max-w-3xl w-full p-6">
        {/* User Type Highlight */}
        <h2 className="text-xl font-bold mb-4 text-center text-blue-500 uppercase">
          {user.userType}
        </h2>

        <div className="space-y-4">
          {/* Display user details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-600 font-semibold">Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  className="block w-full mt-1 p-2 border rounded-md"
                />
              ) : (
                <p className="mt-1 text-gray-800">{user.name}</p>
              )}
            </div>
            <div>
              <label className="text-gray-600 font-semibold">Email:</label>
              <p className="mt-1 text-gray-800">{user.email}</p>
            </div>
            <div>
              <label className="text-gray-600 font-semibold">
                Phone Number:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber || ""}
                  onChange={handleInputChange}
                  className="block w-full mt-1 p-2 border rounded-md"
                />
              ) : (
                <p className="mt-1 text-gray-800">{user.phoneNumber}</p>
              )}
            </div>
            <div>
              <label className="text-gray-600 font-semibold">
                Date of Birth:
              </label>
              {isEditing ? (
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth.split("T")[0] || ""}
                  onChange={handleInputChange}
                  className="block w-full mt-1 p-2 border rounded-md"
                />
              ) : (
                <p className="mt-1 text-gray-800">
                  {new Date(user.dateOfBirth).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="text-gray-600 font-semibold">Address:</label>
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-600 font-semibold">Street:</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.homeAddress.street || ""}
                    onChange={handleAddressChange}
                    className="block w-full mt-1 p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="text-gray-600 font-semibold">City:</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.homeAddress.city || ""}
                    onChange={handleAddressChange}
                    className="block w-full mt-1 p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="text-gray-600 font-semibold">State:</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.homeAddress.state || ""}
                    onChange={handleAddressChange}
                    className="block w-full mt-1 p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="text-gray-600 font-semibold">
                    Zip Code:
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.homeAddress.zipCode || ""}
                    onChange={handleAddressChange}
                    className="block w-full mt-1 p-2 border rounded-md"
                  />
                </div>
              </div>
            ) : (
              <p className="mt-1 text-gray-800">
                {user.homeAddress.street}, {user.homeAddress.city},{" "}
                {user.homeAddress.state} - {user.homeAddress.zipCode}
              </p>
            )}
          </div>

          <div>
            {/* here is to add the condition */}
            {user?.userType === "renter" ? (
              <></>
            ) : (
              <>
                <label className="text-gray-600 font-semibold">
                  House Name:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="houseName"
                    value={formData.houseName || ""}
                    onChange={handleInputChange}
                    className="block w-full mt-1 p-2 border rounded-md"
                  />
                ) : (
                  <p className="mt-1 text-gray-800">
                    {user.userType === "landowner"
                      ? user.houseName || "Not Provided"
                      : ""}
                  </p>
                )}
              </>
            )}
          </div>

          {/* Aadhar Number */}
          <div>
            <label className="text-gray-600 font-semibold">
              Aadhar Number:
            </label>
            {isEditing ? (
              <input
                type="text"
                name="aadharCardNumber"
                value={formData.aadharCardNumber || ""}
                onChange={handleInputChange}
                className="block w-full mt-1 p-2 border rounded-md"
              />
            ) : (
              <p className="mt-1 text-gray-800">
                {user.aadharCardNumber || "Not Provided"}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-6 space-x-4">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-600 text-white rounded"
            >
              Edit Profile
            </button>
          )}
          <button className="px-4 py-2 bg-gray-800 hover:bg-gray-600 text-white rounded">
            <Link to="/dashboard">Dashboard</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
