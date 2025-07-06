import React, { useState } from "react";
import axios from "axios";

const DocToPdf = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [editContent, setEditContent] = useState("");
  const [showButtons, setShowButtons] = useState(false);
  const [convertedBlob, setConvertedBlob] = useState(null);
  const [editingMode, setEditingMode] = useState(false);

  const handleConvert = async () => {
    if (!file) {
      setError("Please select a DOC or DOCX file.");
      return;
    }

    const allowedTypes = [
      "application/msword", // .doc
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Only DOC or DOCX files are allowed.");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", file.name);
    formData.append("description", description);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/convert/doc-to-pdf",
        formData,
        { responseType: "blob" }
      );

      setConvertedBlob(res.data);
      setShowButtons(true);

      // OPTIONAL: Simulate content for edit mode (since we cannot extract PDF content)
      setEditContent("This is a simulated editable version of the document.\n\nYou can edit this text.");

    } catch (err) {
      console.error(err);
      setError("Conversion failed. Please try again.");
    }
  };

  const handleDirectDownload = () => {
    if (!convertedBlob) return;
    const url = window.URL.createObjectURL(new Blob([convertedBlob]));
    const link = document.createElement("a");
    link.href = url;
    link.download = "converted.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleDownloadEdited = () => {
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head><title>Edited PDF</title></head>
        <body>
          <pre style="font-family: Arial; white-space: pre-wrap;">${editContent}</pre>
          <script>
            window.print();
          </script>
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-semibold mb-4">DOC to PDF Converter</h2>

      <input
        type="file"
        accept=".doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <textarea
        placeholder="Optional description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {error && <p className="text-red-600">{error}</p>}

      {!showButtons && (
        <button
          onClick={handleConvert}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Convert
        </button>
      )}

      {showButtons && !editingMode && (
        <div className="mt-4 flex gap-4">
          <button
            onClick={() => setEditingMode(true)}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={handleDirectDownload}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download
          </button>
        </div>
      )}

      {editingMode && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Edit Document</h3>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={10}
            className="w-full p-3 border rounded"
          />
          <button
            onClick={handleDownloadEdited}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download Edited PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default DocToPdf;
