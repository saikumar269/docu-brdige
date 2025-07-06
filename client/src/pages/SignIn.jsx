import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/authContext";
import { loginUser } from "../api/user";
import { Link } from "react-router-dom";

const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await loginUser({ email, password });
    const { user, token } = res.data; // ✅ FIXED
    console.log("Login response", res.data); // ✅ test what you got


    login(user, token); // ✅ now this is valid
    navigate("/"); // stay on home page
  } catch (err) {
    setError("Invalid credentials");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          className="w-full p-2 border mb-4"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
  type="password"
  placeholder="Password"
  className="w-full p-3 mb-2 border border-gray-300 rounded"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
/>

<div className="mb-4 text-right">
  <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
    Forgot Password?
  </Link>
</div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SignIn;
