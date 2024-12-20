import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const handleLogout = async (navigate) => {
  try {
    const response = await fetch("http://localhost:3000/api/users/logout", {
      method: "POST",
      credentials: "include", // Include credentials to handle cookies
    });

    if (response.ok) {
      localStorage.removeItem("user");
      localStorage.removeItem("favouriteRooms");
      navigate("/login"); // Use navigate passed as an argument
    } else {
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

const AuthenticatedUser = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      // If no token is found, redirect to login
      handleLogout(navigate);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
        handleLogout(navigate);
      }
    } catch (error) {
      console.error("Invalid token:", error);
      handleLogout(navigate);
    }
  }, [navigate]);

  return <Outlet />;
};

export default AuthenticatedUser;
