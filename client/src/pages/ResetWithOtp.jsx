import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetWithOtp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp-reset", {
        email,
        otp,
        newPassword,
      });
      setMessage(res.data.message);
      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "OTP verification failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleReset} className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Reset Password with OTP</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full p-2 mb-3 border rounded"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 mb-3 border rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 mb-3 border rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {message && <p className="text-green-500 text-sm mb-2">{message}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetWithOtp;
