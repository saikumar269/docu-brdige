import React, { useState } from "react";

function FileMetaModal({ onSave, onClose }) {
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!fileName.trim()) {
      alert("File name is required.");
      return;
    }

    const fileData = {
      name: fileName.trim(),
      description: description.trim(),
      date: new Date().toLocaleString()
    };

    onSave(fileData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Save File Info</h2>

        <label className="block mb-2 text-sm font-medium">File Name *</label>
        <input
          className="w-full border px-3 py-2 rounded mb-4"
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="e.g., Resume2025"
        />

        <label className="block mb-2 text-sm font-medium">Description (Optional)</label>
        <textarea
          className="w-full border px-3 py-2 rounded mb-4"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What is this file about?"
        ></textarea>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Save & Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileMetaModal;
