const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const htmlPdf = require("html-pdf");
const pdfParse = require("pdf-parse");

const router = express.Router();

// Multer setup
const upload = multer({ dest: "uploads/" });

// Convert DOC → PDF
router.post("/doc-to-pdf", upload.single("file"), async (req, res) => {
  const inputPath = req.file.path;
  const timestamp = Date.now().toString();
  const outputDir = path.join("converted", timestamp);

  try {
    fs.mkdirSync(outputDir, { recursive: true });

    // Run LibreOffice to convert DOC → PDF
    const command = `soffice --headless --convert-to pdf --outdir "${outputDir}" "${inputPath}"`;

    exec(command, async (error, stdout, stderr) => {
      if (error) {
        console.error("Conversion error:", error);
        return res.status(500).send("Conversion failed.");
      }

      const outputFiles = fs.readdirSync(outputDir);
      const pdfFile = outputFiles.find(file => file.endsWith(".pdf"));
      if (!pdfFile) return res.status(500).send("Converted file not found.");

      const pdfPath = path.join(outputDir, pdfFile);
      res.download(pdfPath, err => {
        if (err) {
          console.error("Download error:", err);
          return res.status(500).send("Download failed.");
        }
        fs.unlinkSync(pdfPath);
        fs.unlinkSync(inputPath); // Delete uploaded file
      });
    });
  } catch (err) {
    console.error("Conversion failed:", err);
    res.status(500).send("Conversion failed.");
  }
});

// Extract text from PDF
router.post("/extract-pdf-text", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;

  try {
    const fileBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(fileBuffer);

    fs.unlinkSync(filePath); // cleanup
    res.json({ text: data.text });
  } catch (err) {
    console.error("Text extraction failed:", err);
    res.status(500).json({ error: "Text extraction failed" });
  }
});

// Generate Edited PDF from Text (HTML)
router.post("/generate-edited-pdf", async (req, res) => {
  const html = req.body.html;

  const outputPath = path.join("converted", `edited_${Date.now()}.pdf`);
  try {
    htmlPdf.create(html).toFile(outputPath, (err, result) => {
      if (err) {
        console.error("PDF generation error:", err);
        return res.status(500).send("Failed to generate PDF");
      }

      res.download(result.filename, () => {
        fs.unlinkSync(result.filename); // cleanup
      });
    });
  } catch (err) {
    console.error("PDF creation failed:", err);
    res.status(500).send("PDF creation failed");
  }
});

module.exports = router;
