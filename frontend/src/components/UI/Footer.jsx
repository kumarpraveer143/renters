import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 relative">
      {/* Full-Screen Overlay Loader */}

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Renters Section */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-2xl font-bold mb-2">Renters</h3>
            <p className="text-center sm:text-left">
              Your reliable rental companion.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-2xl font-bold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link className="hover:text-gray-400" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-400" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-400" to="/faq">
                  FAQ
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-400" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Handles Section */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-2xl font-bold mb-2">Follow Us</h3>
            <div className="flex space-x-6 mt-4">
              <Link
                to="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-600"
              >
                <FaFacebook size={24} />
              </Link>
              <Link
                to="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400"
              >
                <FaTwitter size={24} />
              </Link>
              <Link
                to="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-600"
              >
                <FaInstagram size={24} />
              </Link>
              <Link
                to="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-700"
              >
                <FaLinkedin size={24} />
              </Link>
            </div>
          </div>
        </div>

        {/* Reserved Rights Section */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Renters. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
