// src/pages/conversions/ImageToPdf.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ImageToPdf = () => {
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setDownloadUrl(null);
  };

  const handleConvert = async () => {
    if (!file) return alert("Please select an image (JPG or PNG)");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/convert/image-to-pdf",
        formData,
        { responseType: "blob" }
      );

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      alert("Conversion failed.");
    }
  };

    const navigate = useNavigate();
  return (
    <div className="p-6 max-w-xl mx-auto mt-[150px] shadow-lg rounded bg-white bg-gradient-to-br from-green-50 to-white">
        <button className="mb-[50px]" onClick={() => navigate("/convert")}>← Back</button>
      <h2 className="text-3xl font-bold mb-4 text-green-800">Image to PDF Converter</h2>

      <input type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} className="mb-4 p-2 border rounded"/>

      <button
        onClick={handleConvert}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Convert
      </button>

      {downloadUrl && (
        <a
          href={downloadUrl}
          download="converted-image.pdf"
          className="block mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-center"
        >
          Download PDF
        </a>
      )}
    </div>
  );
};

export default ImageToPdf;
