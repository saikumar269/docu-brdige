// src/pages/ResetPassword.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, {
        password,
      });
      setMsg(res.data.message);
      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleReset} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
        <input
          type="password"
          placeholder="New password"
          className="w-full p-3 border mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {msg && <p className="text-green-600 mb-2">{msg}</p>}
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
