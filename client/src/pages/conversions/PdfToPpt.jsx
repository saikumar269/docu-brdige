// src/pages/conversions/PdfToPpt.jsx
import React, { useState } from "react";
import axios from "axios";

const PdfToPpt = () => {
  const [file, setFile] = useState(null);
  const [pptUrl, setPptUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!file) return alert("Upload a PDF first.");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/api/convert/pdf-to-ppt", formData, {
        responseType: "blob",
      });
      const blob = new Blob([res.data], { type: "application/vnd.openxmlformats-officedocument.presentationml.presentation" });
      const url = URL.createObjectURL(blob);
      setPptUrl(url);
    } catch (err) {
      alert("Conversion failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-40 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">PDF to PPT Converter</h2>
      <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleConvert} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        {loading ? "Converting..." : "Convert"}
      </button>
      {pptUrl && (
        <a href={pptUrl} download="converted.pptx" className="block mt-4 px-4 py-2 bg-green-600 text-white rounded text-center">
          Download PPT
        </a>
      )}
    </div>
  );
};

export default PdfToPpt;
