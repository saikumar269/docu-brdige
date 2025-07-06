import React from "react";
import Navbar from "../components/Navbar";

const DownloadsPage = () => {
  const files = JSON.parse(localStorage.getItem("downloads") || "[]");

  return (
    <div className="pt-20 min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">📁 Previously Downloaded Files</h2>

        {files.length === 0 ? (
          <p>No files downloaded yet.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-green-100">
                <th className="px-4 py-2 text-left">File Name</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={index} className="border-t hover:bg-gray-100">
                  <td className="px-4 py-2">{file.name}</td>
                  <td className="px-4 py-2">{file.description || "-"}</td>
                  <td className="px-4 py-2">{file.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DownloadsPage;
