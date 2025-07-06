// src/pages/Conversion.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

const conversions = [
  {
    title: "DOC to PDF",
    description: "Convert your Word documents to PDF format.",
    route: "/convert/doc-to-pdf",
  },
  /* {
    title: "DOC to Excel",
    description: "Convert Word documents to Excel format.",
    route: "/convert/doc-to-excel",
  },
  {
    title: "Excel to DOC",
    description: "Convert Excel files to Word documents.",
    route: "/convert/excel-to-doc",
  },
  {
    title: "Excel to PDF",
    description: "Convert Excel spreadsheets to PDF.",
    route: "/convert/excel-to-pdf",
  },
  {
    title: "PDF to DOC",
    description: "Convert PDF files to editable Word documents.",
    route: "/convert/pdf-to-doc",
  },
  /*{
    title: "PDF to Excel",
    description: "Convert PDF files to Excel spreadsheets.",
    route: "/convert/pdf-to-excel",
  },*/
];

const Conversion = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 py-20 px-15">
      <h1 className="text-3xl font-bold text-center mb-10">Choose Conversion Type</h1>

      <div className="grid   max-w-2xl mx-auto px-4 py-8">
  {conversions.map((conv, index) => (
    <div
      key={index}
      className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-between"
    >
      <h2 className="text-xl font-semibold mb-4">{conv.title}</h2>
      <p className="text-gray-600 text-center mb-6">{conv.description}</p>
      <button
        onClick={() => navigate(conv.route)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
      >
        Convert Now
      </button>
    </div>
  ))}
</div>

    </div>
  );
};

export default Conversion;
