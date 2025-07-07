import React, { useState } from "react";
import axios from "axios";
import { PDFDocument, rgb } from "pdf-lib";
import { useNavigate } from "react-router-dom";

const ExcelToPdf = () => {
  const [file, setFile] = useState(null);
  const [textData, setTextData] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setTextData("");
    setIsEditing(false);
    setShowActions(false);
  };

  const handleConvert = async () => {
    if (!file) return alert("Please upload an Excel file");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/api/convert/excel-to-pdf", formData);
      setTextData(response.data.text);
      setShowActions(true); // Show Edit and Download buttons
    } catch (err) {
      console.error(err);
      alert("Conversion failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDownloadEditedPDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size

    const { width, height } = page.getSize();
    const fontSize = 12;
    const lines = textData.split("\n");
    let y = height - 50;

    lines.forEach((line) => {
      page.drawText(line, {
        x: 50,
        y,
        size: fontSize,
        color: rgb(0, 0, 0),
        maxWidth: width - 100,
      });
      y -= 20;
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "edited.pdf";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 max-w-xl mx-auto mt-[150px] shadow-lg rounded bg-white bg-gradient-to-br from-green-50 to-white">
      <button className="mb-[50px]" onClick={() => navigate("/convert")}>← Back</button>
      <h1 className="text-3xl font-bold mb-4 text-green-800">Excel to Editable PDF</h1>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileChange}
        className="mb-4 p-2 border rounded"
      />

      {!showActions && (
        <button
          onClick={handleConvert}
          disabled={!file || loading}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Converting..." : "Convert"}
        </button>
      )}

      {showActions && (
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={handleDownloadEditedPDF}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Download
          </button>
        </div>
      )}

      {isEditing && (
        <div className="mt-6 w-full max-w-2xl">
          <textarea
            rows={15}
            value={textData}
            onChange={(e) => setTextData(e.target.value)}
            className="w-full p-3 border rounded mb-4"
          />
          <button
            onClick={handleDownloadEditedPDF}
            className="mt-2 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Download Edited PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default ExcelToPdf;
