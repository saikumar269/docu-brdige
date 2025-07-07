// src/pages/Conversion.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

const conversions = [
  {
    title: "DOC to PDF",
    description: "Convert your Word documents to PDF format.",
    route: "/convert/doc-to-pdf",
  },
  {
    title: "Excel to PDF",
    description: "Convert Excel spreadsheets to PDF.",
    route: "/convert/excel-to-pdf",
  },
  {
    title: "PPT to PDF",
    description: "Convert your Presentation to PDF.",
    route: "/convert/ppt-to-pdf",
  },
  {
    title: "Image to PDF",
    description: "Convert your Image to PDF.",
    route: "/convert/image-to-pdf",
  },
  {
    title: "PDF to PPT",
    description: "Convert your PDF files into PowerPoint presentations.",
    route: "/convert/pdf-to-ppt", // ✅ NEW
  },
  /*{
    title: "Remove Pages in PDF",
    description: "Remove unwanted pages from your PDF documents.",
    route: "/convert/remove-pages", // ✅ NEW
  },
  {
    title: "Sign PDF",
    description: "Digitally sign your PDF files easily.",
    route: "/convert/sign-pdf", // ✅ NEW
  }, */
];


const Conversion = () => {
  const navigate = useNavigate();

  return (
    
    <div className="min-h-screen bg-gray-100 py-20 px-15">
      
      <h1 className="text-3xl font-bold text-center mt-[30px] ">Choose Conversion Type</h1>

      <div className="grid max-w-4xl mx-auto ">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
  {conversions.map((conv, index) => (
    <div
      key={index}
      className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-between m-5 hover:shadow-lg transition-shadow duration-300 gap-4 hover:bg-blue-50"
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

    </div>
  );
};

export default Conversion;
