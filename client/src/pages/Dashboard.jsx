import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      // If no user, redirect to login
      navigate("/signin");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">
          Welcome, {user?.name} 👋
        </h2>
        <p className="text-lg text-gray-600">
          You are now logged in to DocuBridge!
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
