import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const DocToPdf = () => {
  const [file, setFile] = useState(null);
  const [convertedFileUrl, setConvertedFileUrl] = useState(null);
  const [convertedFilePath, setConvertedFilePath] = useState(""); // server-side path for extract
  const [editContent, setEditContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setShowActions(false);
    setIsEditing(false);
    setConvertedFileUrl(null);
    setEditContent("");
    setConvertedFilePath("");
  };

  const handleConvert = async () => {
  if (!file) return alert("Please select a DOC file");

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await axios.post("http://localhost:5000/api/convert", formData);
    const { filePath, downloadUrl } = res.data;

    setConvertedFilePath(filePath);
    setConvertedFileUrl(`http://localhost:5000${downloadUrl}`);
    setShowActions(true);
  } catch (err) {
    console.error(err);
    alert("Conversion failed.");
  }
};


  const handleEdit = async () => {
    if (!convertedFilePath) return alert("No converted file found");

    try {
      const res = await axios.post("http://localhost:5000/api/extract", {
        filePath: convertedFilePath,
      });

      setEditContent(res.data.text);
      setIsEditing(true);
    } catch (err) {
      console.error("❌ Edit failed", err);
      alert("Failed to extract content for editing");
    }
  };

  const handleDownloadEdited = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/generate-pdf",
        { content: editContent },
        { responseType: "blob" }
      );

      const blob = new Blob([res.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "edited.pdf";
      link.click();
    } catch (err) {
      console.error(err);
      alert("Failed to generate edited PDF.");
    }
  };
  const navigate = useNavigate();

  return (
    <>
    <div className="p-6 max-w-xl mx-auto mt-[150px] shadow-lg rounded bg-white bg-gradient-to-br from-green-50 to-white">
      <button className="mb-[50px]" onClick={() => navigate("/convert")}>← Back</button>
      <h2 className="text-3xl font-bold mb-4 text-green-800">DOC to PDF Converter</h2>

      <input type="file" accept=".doc,.docx" onChange={handleFileChange} className="mb-4 p-2 border rounded" />

      {!showActions && (
        <button
          onClick={handleConvert}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Convert
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
          <a
            href={convertedFileUrl}
            download="converted.pdf"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Download
          </a>

        </div>
      )}

      {isEditing && (
        <div className="mt-6">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={10}
            className="w-full p-3 border rounded"
          />
          <button
            onClick={handleDownloadEdited}
            className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Download Edited PDF
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default DocToPdf;
