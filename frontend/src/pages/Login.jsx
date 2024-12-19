import React, { useState } from "react";
import axios from "axios"; // Import axios
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To store error message
  const [loading, setLoading] = useState(false); // To handle loading state

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const loginData = {
      email,
      password,
    };

    try {
      // Make API request to login endpoint
      const response = await axios.post(`${API_URL}/users/login`, loginData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Login Successful");
        let user = response.data.user;
        delete user.password;
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/"); // Redirect to the homepage after successful login
      }
    } catch (error) {
      // Handle error response from the server
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false); // Reset loading state after request is completed
    }
  };

  return (
    <div className="bg-gray-50 md:h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white py-10 px-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Email Input */}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />
          </div>

          {/* Password Input */}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />
          </div>

          {/* Error message */}
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-600 transition duration-300"
              disabled={loading} // Disable the button while loading
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        {/* Additional Links */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Sign up
            </a>
          </p>
          <p className="text-sm text-gray-600 mt-3">
            Forgot your password?{" "}
            <a
              href="/forget-password"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Reset here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
