import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { API_URL } from "../../config";

const AddRent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { rentPrice } = location.state || {};

  const [formData, setFormData] = useState({
    rentPaid: "",
    paymentMethod: "Online",
    remarks: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  let { relationId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/history/${relationId}`,
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Data submitted successfully!");
      } else {
        toast.warn(
          "Submission was successful, but the server returned an unexpected response."
        );
      }
      navigate("/my-renters");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during submission. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <div className="mb-4">
          <h2 className="text font-bold  text-gray-800">Room Rent</h2>
          <span className="text-3xl text-red-800 font-bold"> ₹{rentPrice}</span>
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="rentPaid"
          >
            Rent Paid
          </label>
          <input
            type="number"
            id="rentPaid"
            name="rentPaid"
            value={formData.rentPaid}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Rent Paid"
            required
          />
        </div>

        {/* <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="dues"
          >
            Pending Dues
          </label>
        </div> */}

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="paymentMethod"
          >
            Payment Method
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Online">Online</option>
            <option value="Cash">Cash</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="date"
          >
            Date of Rent
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="remarks"
          >
            Remarks
          </label>
          <textarea
            id="remarks"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Add any remarks"
            rows="3"
          />
        </div>

        <div className="">
          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Submit
          </button>
          <Link to="/my-renters">
            <button className=" mt-4 w-full bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400">
              Back
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddRent;
