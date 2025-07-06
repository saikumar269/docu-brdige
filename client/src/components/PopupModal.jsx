import React from "react";
import { useNavigate } from "react-router-dom";

function PopupModal({ onClose }) {
  const navigate = useNavigate();

  const handleGuest = () => {
    localStorage.setItem("guestMode", "true");
    localStorage.setItem("guestConversionUsed", "false");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-xl font-semibold mb-4">Welcome to DocuBridge</h2>
        <p className="text-gray-600 mb-6">
          You can convert 1 file for free as a guest. After that, please sign in.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => {
              onClose();
              navigate("/signin");
            }}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Sign In
          </button>
          <button
            onClick={handleGuest}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupModal;
