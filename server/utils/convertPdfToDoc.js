// server/utils/convertPdfToDoc.js
const { PythonShell } = require("python-shell");
const path = require("path");

function convertPdfToDoc(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    console.log(`Starting Python conversion: ${inputPath} → ${outputPath}`);
    PythonShell.run(
      path.join(__dirname, "convert_pdf_to_docx.py"),
      {
        pythonPath: "C:\\Users\\SAI KUMAR\\anaconda3\\python.exe",
        args: [inputPath, outputPath],
      },
      (err, results) => {
        if (err) {
          console.error("PythonShell error:", err);
          return reject(err);
        }
        console.log("PythonShell results:", results);
        resolve(outputPath);
      }
    );
  });
}

module.exports = { convertPdfToDoc };
