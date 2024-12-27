import React, { useEffect, useState } from "react";
import { FaHistory, FaMoneyBillWave, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { API_URL } from "../../config";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import NoRenters from "./NoRenters";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/UI/Loading";

const MyRenters = () => {
  const [renters, setRenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const data = async () => {
      let response = await axios.get(`${API_URL}/relationship/getRenters`, {
        withCredentials: true,
      });
      // console.log(response.data.renters[0].renterStatus);
      let activeRenters = response.data.renters.filter(
        (item) => item.renterStatus === "active"
      );
      setRenters(activeRenters);
    };
    data();
    setLoading(false);
  }, []);

  const handleCheckHistory = (relationId) => {
    navigate(`/check-history/${relationId}`);
  };

  const handleAddRent = (relationId, rentPrice) => {
    navigate(`/add-rent/${relationId}`, {
      state: {
        rentPrice,
      },
    });
  };

  const handleRemoveRenter = async (relationId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will Archive renter!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Archive it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.post(
          `${API_URL}/relationship/removeRenter`,
          { relationId },
          { withCredentials: true }
        );

        if (response.status === 200) {
          setRenters((prevRenters) =>
            prevRenters.filter((renter) => renter.relationId !== relationId)
          );
        }

        toast.success("Renter removed successfully!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to remove renter. Please try again.");
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (renters.length === 0) {
    return <NoRenters />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        My Renters
      </h1>
      <div className="space-y-4">
        {renters.map((renter) => (
          <div
            key={renter.relationId}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row md:items-start md:justify-between"
          >
            <div className="text-left">
              <h2 className="text-2xl mb-3 font-semibold text-gray-800">
                {renter.renterDetails.name}
              </h2>

              <p className="text-gray-600">
                Email: {renter.renterDetails.email}
              </p>
              <p className="text-gray-600">
                Phone: {renter.renterDetails.phoneNumber}
              </p>
              <p className="text-gray-600">
                Date of Birth:{" "}
                {new Date(
                  renter.renterDetails.dateOfBirth
                ).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                Address: {renter.renterDetails.homeAddress.street},{" "}
                {renter.renterDetails.homeAddress.city},{" "}
                {renter.renterDetails.homeAddress.state} -{" "}
                {renter.renterDetails.homeAddress.zipCode}
              </p>
              <div className="mt-2">
                <div className="mb-4">
                  Room Number :
                  <span className="text-2xl text-red-600 font-semibold">
                    {renter.roomDetails.roomNumber}
                  </span>
                </div>

                <span className="text-red-600 font-bold">
                  {renter.roomDetails.roomType} room
                </span>
                <br></br>
                <span className="text-2xl font-bold">
                  Rent Price : ₹{renter.roomDetails.rentPrice}
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <button
                className="relative flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 md:px-6 md:justify-start group"
                onClick={() => handleCheckHistory(renter.relationId)}
              >
                <FaHistory className="mr-2" />
                <span className="hidden md:inline">Check History</span>
                <span className="absolute hidden group-hover:inline text-xs bg-black text-white rounded px-2 py-1 bottom-full mb-1">
                  Check History
                </span>
              </button>
              <button
                className="relative flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 md:px-6 md:justify-start group"
                onClick={() =>
                  handleAddRent(renter.relationId, renter.roomDetails.rentPrice)
                }
              >
                <FaMoneyBillWave className="mr-2" />
                <span className="hidden md:inline">Add Rent</span>
                <span className="absolute hidden group-hover:inline text-xs bg-black text-white rounded px-2 py-1 bottom-full mb-1">
                  Add Rent
                </span>
              </button>
              <button
                className="relative flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 md:px-6 md:justify-start group"
                onClick={() => handleRemoveRenter(renter.relationId)}
              >
                <FaTrashAlt className="mr-2" />
                <span className="hidden md:inline">Remove Renter</span>
                <span className="absolute hidden group-hover:inline text-xs bg-black text-white rounded px-2 py-1 bottom-full mb-1">
                  Remove Renter
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRenters;
