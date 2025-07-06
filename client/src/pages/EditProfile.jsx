import React, { useState, useEffect } from "react";
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
        "http://localhost:5000/api/user/profile",
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      login(data.user, token);
      setMessage("Profile updated!");
      setTimeout(() => navigate("/profile"), 1500);
    } catch (err) {
      setMessage("Update failed.");
    }
  };

  if (!user) return <p className="mt-32 text-center">Access denied.</p>;

  return (
    <div className="pt-28 px-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-green-700 mb-4">Edit Profile</h1>
      {message && <p className="text-center text-blue-600">{message}</p>}
      <form className="bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
        <label className="block mb-2">Name</label>
        <input className="w-full border p-2 mb-4" value={name} onChange={e => setName(e.target.value)} />
        <label className="block mb-2">Email</label>
        <input className="w-full border p-2 mb-4" value={email} onChange={e => setEmail(e.target.value)} />
        <button type="submit" className="btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
