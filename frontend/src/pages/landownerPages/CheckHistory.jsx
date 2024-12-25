import React, { useEffect, useState } from "react";
import NoHistory from "./NoHistory";
import axios from "axios";
import { API_URL } from "../../config";
import { Link, useParams } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const CheckHistory = () => {
  const [rentHistory, setRentHistory] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedRent, setEditedRent] = useState({});

  const { relationId } = useParams();

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await axios.get(`${API_URL}/history/${relationId}`, {
        withCredentials: true,
      });
      setRentHistory(response.data.history);
    };
    fetchHistory();
  }, [relationId]);

  // Format the date to "Month Day, Year" format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedRent({
      rentPaid: rentHistory[index].rentPaid,
      paymentMethod: rentHistory[index].paymentMethod,
      remarks: rentHistory[index].remarks || "",
      date: rentHistory[index].date,
    });
  };

  const handleDelete = async (historyId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this history item? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${API_URL}/history/${historyId}`,
            {
              withCredentials: true,
            }
          );

          let filteredHistory = rentHistory.filter(
            (rent) => rent._id !== historyId
          );
          setRentHistory(filteredHistory);
        } catch (err) {
          console.log(err);
          Swal.fire(
            "Error!",
            "Something went wrong. Please try again.",
            "error"
          );
        }
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (historyId) => {
    try {
      const response = await axios.patch(
        `${API_URL}/history/${historyId}`,
        editedRent,
        {
          withCredentials: true,
        }
      );

      setRentHistory((prevHistory) =>
        prevHistory.map((item) =>
          item._id === historyId ? { ...item, ...editedRent } : item
        )
      );

      toast.success("History updated successfully!");
    } catch (err) {
      console.log(err);
    }
    setEditIndex(null);
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
                {editIndex === index ? (
                  <>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        name="rentPaid"
                        value={editedRent.rentPaid}
                        onChange={handleChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="date"
                        name="date"
                        value={editedRent.date}
                        onChange={handleChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        name="paymentMethod"
                        value={editedRent.paymentMethod}
                        onChange={handleChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      >
                        <option value="cash">Cash</option>
                        <option value="online">Online</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        name="remarks"
                        value={editedRent.remarks}
                        onChange={handleChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => handleSave(rent._id)}
                        className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditIndex(null)}
                        className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border border-gray-300 px-4 py-2">
                      ₹{rent.rentPaid}
                    </td>
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
                      <button
                        onClick={() => handleEdit(index)}
                        className="bg-gray-800 hover:bg-gray-600 text-white px-3 py-1 rounded mr-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(rent._id)}
                        className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/my-renters">
          <button className="w-full bg-gray-800 hover:bg-gray-600 text-white px-3 py-1 rounded mt-5">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CheckHistory;
