import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const ViewProfile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="pt-20 min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-md mx-auto bg-white shadow-md p-6 rounded-md mt-10">
        <h2 className="text-xl font-bold mb-4">👤 User Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => navigate("/edit-profile")}
        >
          ✏️ Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ViewProfile;
