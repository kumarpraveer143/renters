import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../config";

const SignupRenters = () => {
  const [userType, setUserType] = useState("renter");
  const [formData, setFormData] = useState({
    userType: "renter",
    name: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    houseName: "",
    homeAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // New state for tracking submission status
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("homeAddress.")) {
      const addressField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        homeAddress: {
          ...prevData.homeAddress,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lock the form by setting isSubmitting to true
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_URL}/users/register`, formData);

      if (response.status === 200) {
        toast.success("User registered successfully");
        navigate("/login"); // Redirect to login page
      } else {
        console.error("Registration failed:", response.data.message);
        toast.error(`Registration failed: ${response.data.message}`);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while registering. Please try again."
      );
    } finally {
      // After submission completes, unlock the form
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-8">
      <div className="w-full max-w-lg bg-white py-8 px-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Sign Up
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* User Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sign up as
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="renter"
                  checked={userType === "renter"}
                  onChange={(e) => {
                    setUserType(e.target.value);
                    setFormData((prevData) => ({
                      ...prevData,
                      userType: e.target.value,
                    }));
                  }}
                  className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-400"
                />
                <span className="ml-2 text-gray-700">Renter</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="landowner"
                  checked={userType === "landowner"}
                  onChange={(e) => {
                    setUserType(e.target.value);
                    setFormData((prevData) => ({
                      ...prevData,
                      userType: e.target.value,
                    }));
                  }}
                  className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-400"
                />
                <span className="ml-2 text-gray-700">Landowner</span>
              </label>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* House Name */}
          {userType === "landowner" ? (
            <>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  House Name
                </label>
                <input
                  type="text"
                  id="houseName"
                  name="houseName"
                  value={formData.houseName}
                  onChange={handleChange}
                  placeholder="Enter your House Name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </>
          ) : (
            <></>
          )}

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Home Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Home Address
            </label>
            <input
              type="text"
              name="homeAddress.street"
              value={formData.homeAddress.street}
              onChange={handleChange}
              placeholder="Street"
              className="w-full p-3 mb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="homeAddress.city"
              value={formData.homeAddress.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full p-3 mb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="homeAddress.state"
              value={formData.homeAddress.state}
              onChange={handleChange}
              placeholder="State"
              className="w-full p-3 mb-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="homeAddress.zipCode"
              value={formData.homeAddress.zipCode}
              onChange={handleChange}
              placeholder="Zip Code"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Signup Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-600 transition duration-300"
              disabled={isSubmitting} // Disable the button during submission
            >
              {isSubmitting ? "Submitting..." : "Sign Up"}
            </button>
          </div>
        </form>

        {/* Additional Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupRenters;
