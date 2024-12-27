import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { FaUserCircle } from "react-icons/fa"; // Import user icon
import { API_URL } from "../../config";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user = localStorage.getItem("user");

  const handleNavigation = (path) => {
    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
      setIsMenuOpen(false);
    }, 1000);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/users/logout`, {
        method: "POST",
        credentials: "include", // Include credentials to handle cookies
      });

      if (response.ok) {
        localStorage.removeItem("user");
        localStorage.removeItem("favouriteRooms");
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white relative">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <button
            onClick={() => handleNavigation("/")}
            className="focus:outline-none"
          >
            Renters
          </button>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            className="hover:text-gray-400"
            onClick={() => handleNavigation("/")}
          >
            Home
          </Link>
          <Link
            className="hover:text-gray-400"
            onClick={() => handleNavigation("/about")}
          >
            About
          </Link>
          <Link
            className="hover:text-gray-400"
            onClick={() => handleNavigation("/developer")}
          >
            Developer
          </Link>
          <Link
            className="hover:text-gray-400"
            onClick={() => handleNavigation("/contact")}
          >
            Contact
          </Link>
        </div>

        {/* Profile and Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              {/* Profile Section */}
              <div className="flex items-center space-x-2 md:mr-6">
                <FaUserCircle size={24} className="text-gray-400" />
                <Link
                  className="text-gray-200 cursor-pointer"
                  onClick={() => handleNavigation("/dashboard")}
                >
                  Dashboard
                </Link>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="px-4 py-2 bg-[#526D82] hover:bg-[#9DB2BF] text-[#DDE6ED] rounded"
                onClick={() => handleNavigation("/signup")}
              >
                Sign Up
              </Link>
              <Link
                className="px-4 py-2 border border-white hover:bg-gray-700 rounded"
                onClick={() => handleNavigation("/login")}
              >
                Log In
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-400 hover:text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700">
          <Link
            onClick={() => handleNavigation("/")}
            className="block px-4 py-2 hover:bg-gray-600 text-center"
          >
            Home
          </Link>
          <Link
            onClick={() => handleNavigation("/about")}
            className="block px-4 py-2 hover:bg-gray-600 text-center"
          >
            About
          </Link>
          <Link
            onClick={() => handleNavigation("/developer")}
            className="block px-4 py-2 hover:bg-gray-600 text-center"
          >
            Developer
          </Link>
          <Link
            onClick={() => handleNavigation("/contact")}
            className="block px-4 py-2 hover:bg-gray-600 text-center"
          >
            Contact
          </Link>
          {JSON.parse(user)?.userType === "renter" ? (
            <>
              <Link
                onClick={() => handleNavigation("/findrooms")}
                className="block px-4 py-2 hover:bg-gray-600 text-center"
              >
                Rooms
              </Link>
            </>
          ) : (
            <></>
          )}

          {user ? (
            <>
              <div className="block px-4 py-2 hover:bg-gray-600 text-center">
                <Link onClick={() => handleNavigation("/dashboard")}>
                  Dashboard
                </Link>
              </div>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-center text-white rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                onClick={() => handleNavigation("/signup")}
                className="block px-4 py-2 bg-[#526D82] hover:bg-[#9DB2BF] text-center text-[#DDE6ED] rounded"
              >
                Sign Up
              </Link>
              <Link
                onClick={() => handleNavigation("/login")}
                className="block px-4 py-2 border border-gray-400 text-center hover:bg-gray-600 rounded"
              >
                Log In
              </Link>
            </>
          )}
        </div>
      )}

      {/* Full-Screen Overlay Loader */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 h-screen">
          <HashLoader color="#fff" loading={loading} size={50} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
