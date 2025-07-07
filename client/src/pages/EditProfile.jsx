import React, { useState } from "react";
import { useAuth } from "../Context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.patch(
        "http://localhost:5000/api/auth/update-profile", // ✅ fixed endpoint
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data?.success) {
        login(data.user, token); // update context
        setMessage("✅ Profile updated successfully!");
        setTimeout(() => navigate("/profile"), 1500);
      } else {
        setMessage("❌ Update failed. Please try again.");
      }
    } catch (err) {
      console.error("Update Error:", err);
      setMessage("❌ Update failed.");
    }
  };

  if (!user) return <p className="mt-32 text-center">Access denied.</p>;

  return (
    <div className="pt-28 px-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-green-700 mb-4">Edit Profile</h1>
      {message && <p className="text-center text-blue-600 mb-4">{message}</p>}
      <form className="bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium">Name</label>
        <input
          className="w-full border p-2 mb-4 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label className="block mb-2 font-medium">Email</label>
        <input
          className="w-full border p-2 mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
