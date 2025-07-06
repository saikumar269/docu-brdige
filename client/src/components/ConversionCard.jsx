import React from "react";

const ConversionCard = ({ title, imageSrc, onClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-between transition-transform hover:scale-105 border">
      <img src={imageSrc} alt={title} className="w-28 h-28 object-contain mb-4" />
      <h3 className="text-lg font-semibold text-center">{title}</h3>
      <button
        onClick={onClick}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Convert
      </button>
    </div>
  );
};

export default ConversionCard;
