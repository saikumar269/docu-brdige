import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleRequestOtp = async (e) => {
  e.preventDefault();
  setMessage("");
  setError("");
  

  try {
    const res = await axios.post("http://localhost:5000/api/auth/request-reset-otp", { email });
    setMessage(res.data.message);

    // ✅ Redirect to Reset Password page after OTP is sent
    setTimeout(() => {
      navigate("/reset-password");
    }, 1000);
  } catch (err) {
    setError(err.response?.data?.error || "Failed to send OTP");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleRequestOtp} className="bg-white shadow-md p-6 rounded-md w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your registered email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {message && <p className="text-green-600 text-sm mb-2">{message}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Send OTP
        </button>
        
        

      </form>
      
    </div>
  );
};

export default ForgotPassword;
