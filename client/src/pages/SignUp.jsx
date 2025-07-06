import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../api/user";

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await signupUser({ name, email, password });
      setSuccess(res.data.message);
      setError("");
      setTimeout(() => navigate("/signin"), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" className="w-full p-3 mb-4 border border-gray-300 rounded" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" className="w-full p-3 mb-4 border border-gray-300 rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="w-full p-3 mb-4 border border-gray-300 rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="password" placeholder="Confirm Password" className="w-full p-3 mb-4 border border-gray-300 rounded" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

          <button type="submit" className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition">
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/signin" className="text-green-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
