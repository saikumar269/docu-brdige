// src/components/Footer.jsx
import React from "react";
import logo from "../assets/logo.png"; // optional logo

const Footer = () => {
  return (
    <footer className="bg-white  text-center m-4">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center mb-4 md:mb-0">
          
          <div className="text-left">
            <h2 className="text-lg font-bold text-green-700">DocuBridge Pvt. Ltd. </h2>
            <p className="text-sm text-gray-600">Hyderabad, Telangana, India</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} DocuBridge. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
