import React, { useState } from "react";
import axios from "axios";

const PdfToDoc = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [msg, setMsg] = useState("");

  const handleConvert = async () => {
    if (!file || file.type !== "application/pdf") {
      setMsg("Please upload a valid PDF.");
      return;
    }
    const form = new FormData();
    form.append("file", file);
    form.append("title", file.name);
    form.append("description", desc);

    try {
      const res = await axios.post("http://localhost:5000/api/convert/pdf-to-doc", form, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.pdf$/, ".docx");
      document.body.append(a);
      a.click();
      a.remove();
      setMsg("Converted successfully!");
    } catch (err) {
      console.error(err);
      setMsg("Conversion error.");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl mb-4">PDF → DOC</h2>
      <input type="file" accept=".pdf" onChange={e => setFile(e.target.files[0])} />
      <input
        type="text"
        placeholder="Description (optional)"
        value={desc}
        onChange={e => setDesc(e.target.value)}
        className="mt-2 border p-2 w-full"
      />
      <button onClick={handleConvert} className="mt-4 px-4 py-2 bg-blue-600 text-white">
        Convert
      </button>
      {msg && <p className="mt-2">{msg}</p>}
    </div>
  );
};

export default PdfToDoc;
