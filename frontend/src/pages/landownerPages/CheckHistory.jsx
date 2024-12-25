import React, { useEffect, useState } from "react";
import NoHistory from "./NoHistory";

import axios from "axios";
import { API_URL } from "../../config";
import { useParams } from "react-router-dom";

const CheckHistory = () => {
  let [rentHistory, setRentHistory] = useState([]);

  const { relationId } = useParams();

  useEffect(() => {
    let history = async () => {
      let repsonse = await axios.get(`${API_URL}/history/${relationId}`, {
        withCredentials: true,
      });
      setRentHistory(repsonse.data.history);
    };
    history();
  }, []);

  // Format the date to "Month Day, Year" format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  if (rentHistory.length === 0) {
    return <NoHistory />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rent History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Rent Paid
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Date
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Payment Method
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Remarks
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rentHistory.map((rent, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 transition-all even:bg-gray-50"
              >
                <td className="border border-gray-300 px-4 py-2">{`₹${rent.rentPaid}`}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {formatDate(rent.date)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {rent.paymentMethod}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {rent.remarks || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button className="bg-gray-800 hover:bg-gray-600 text-white px-3 py-1 rounded">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CheckHistory;
