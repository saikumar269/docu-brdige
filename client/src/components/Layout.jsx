import React from "react";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import { motion } from "framer-motion";

const Layout = () => {
  const { user, isGuest, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 bg-white shadow z-50 flex justify-between items-center px-6 py-4"
      >
        <Link to="/" className="text-4xl font-bold text-green-700">DocuBridge</Link>

        <div className="flex items-center space-x-4">
          {user || isGuest ? (
            <button onClick={() => navigate("/")} className="font-medium text-green-600 hover:underline">Home</button>
          ) : null}

          {user ? (
            <div className="relative group">
              <button className="font-semibold text-green-800">My Account ⌄</button>
              <div className="absolute right-0 hidden group-hover:block bg-white shadow rounded-md z-10">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">View Profile</Link>
                <Link to="/edit-profile" className="block px-4 py-2 hover:bg-gray-100">Edit Profile</Link>
                <Link to="/downloads" className="block px-4 py-2 hover:bg-gray-100">Downloads</Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">
                  Log Out
                </button>
              </div>
            </div>
          ) : isGuest ? null : (
            <>
              <Link to="/signin" className="font-medium text-green-600 hover:underline">Sign In</Link>
              <Link to="/signup" className="font-medium text-green-600 hover:underline">Sign Up</Link>
            </>
          )}
        </div>
      </motion.nav>

      <div className="mt-24 px-4">
        <Outlet />
      </div>

      <footer className="bg-white py-6 px-4 mt-12 border-t">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold text-green-700">DocuBridge Pvt. Ltd.</h2>
            <p className="text-sm text-gray-600">Hyderabad, Telangana, India</p>
          </div>
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} DocuBridge. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Layout;
