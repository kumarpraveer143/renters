import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";

const RenterHistoryDetails = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      try {
        let response = await axios.get(
          `${API_URL}/relationship/historyOfRenter`,
          { withCredentials: true }
        );
        setHistory(response.data.histories);
      } catch (error) {
        console.error("Failed to fetch renter history:", error);
      }
    };
    getHistory();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Renter History Details</h1>
      {history.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Date
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Rent Paid
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Payment Method
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Remarks
                </th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {formatDate(item.date)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ₹{item.rentPaid}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.paymentMethod}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.remarks || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No history available.</p>
      )}
    </div>
  );
};

export default RenterHistoryDetails;
