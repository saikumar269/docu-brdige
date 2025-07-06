import React, { useState } from "react";
import FileMetaModal from "../components/FileMetaModal";
import Navbar from "../components/Navbar";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [convertedBlob, setConvertedBlob] = useState(null);
  const [showMetaModal, setShowMetaModal] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleConvert = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/api/convert", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File conversion failed");
      }

      const blob = await response.blob(); // Get file back as Blob
      setConvertedBlob(blob);
      setShowMetaModal(true); // Show modal to ask for file name
    } catch (error) {
      console.error(error);
      alert("Something went wrong during conversion.");
    }
  };

  const handleSaveMeta = (fileData) => {
    // Save file info in localStorage
    const downloads = JSON.parse(localStorage.getItem("downloads") || "[]");
    downloads.push(fileData);
    localStorage.setItem("downloads", JSON.stringify(downloads));

    // Download file
    const url = URL.createObjectURL(convertedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileData.name || "converted-file";
    a.click();

    setFile(null);
    setConvertedBlob(null);
    setShowMetaModal(false);
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow rounded">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
          Upload & Convert File
        </h2>

        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full border px-3 py-2 rounded mb-4"
        />

        <button
          onClick={handleConvert}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          Convert & Download
        </button>
      </div>

      {showMetaModal && (
        <FileMetaModal
          onSave={handleSaveMeta}
          onClose={() => setShowMetaModal(false)}
        />
      )}
    </div>
  );
};

export default Upload;
