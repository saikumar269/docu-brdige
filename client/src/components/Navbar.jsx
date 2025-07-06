// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../Context/authContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-3 flex justify-between items-center">

        <Link to="/" className="text-4xl font-bold text-green-700 p-0">
          DocuBridge
        </Link>

        <div className="flex items-center space-x-4">
          {!isHome && (
            <Link
              to="/"
              className="text-sm font-medium text-gray-600 border-2 border-green-700 bg-transparent text-green-700 font-semibold px-4 py-2 rounded hover:bg-green-700 hover:text-white transition"
            >
              Home
            </Link>
          )}

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-sm font-medium border-2 border-green-700 bg-transparent text-green-700 font-semibold px-4 py-2 rounded hover:bg-green-700 hover:text-white transition"
              >
                My Account
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    View Profile
                  </Link>
                  <Link
                    to="/edit-profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Edit Profile
                  </Link>
                  <Link
                    to="/downloads"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Downloads
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/signin"
                className="text-sm font-medium border-2 border-blue-600 bg-transparent text-blue-600 font-semibold px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-sm font-medium border-2 border-blue-600 bg-transparent text-blue-600 font-semibold px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
