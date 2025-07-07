// routes/convertExcelToPdf.js
const express = require("express");
const multer = require("multer");
const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Convert Excel to PDF route
router.post("/excel-to-pdf", upload.single("file"), async (req, res) => {
  try {
    const inputPath = req.file.path;
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(inputPath);

    const worksheet = workbook.worksheets[0];

    // Create PDF
    const pdfPath = `uploads/${Date.now()}-output.pdf`;
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    worksheet.eachRow((row, rowIndex) => {
      let rowText = row.values
        .filter((v) => v !== null && v !== undefined)
        .join(" | ");
      doc.text(rowText);
    });

    doc.end();

    writeStream.on("finish", () => {
      // Delete uploaded Excel file after conversion
      fs.unlinkSync(inputPath);
      res.download(pdfPath, () => {
        fs.unlinkSync(pdfPath); // Delete the PDF after download
      });
    });
  } catch (err) {
    console.error("Conversion Error:", err);
    res.status(500).json({ error: "Conversion failed." });
  }
});

module.exports = router;
