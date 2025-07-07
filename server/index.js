const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");
const mongoose = require("mongoose");
const sharp = require("sharp"); // if you want to manipulate image dimensions (optional)
const libreConvert = require("libreoffice-convert");
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');
const PptxGenJS = require("pptxgenjs");            // for PDF → PPTX
const { PDFDocument: PDFLib } = require("pdf-lib");
const { PDFDocument, StandardFonts } = require("pdf-lib");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const dotenv = require("dotenv");


const { convertFile } = require("./convert"); // DOC to PDF

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Ensure outputs/ folder exists
const uploadsDir = path.join(__dirname, "uploads");
const outputsDir = path.join(__dirname, "outputs");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
if (!fs.existsSync(outputsDir)) fs.mkdirSync(outputsDir);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ File Upload Setup (Multer)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ Auth & Download Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/downloads", require("./routes/download"));

// ✅ DOC to PDF Conversion
app.post("/api/convert", upload.single("file"), async (req, res) => {
  try {
    const inputPath = req.file.path;
    const outputPath = await convertFile(inputPath);

    const fileName = path.basename(outputPath);
    const downloadUrl = `/api/download/${fileName}`;

    res.json({
      message: "File converted",
      filePath: outputPath,
      fileName,
      downloadUrl,
    });
  } catch (err) {
    console.error("❌ Conversion Error:", err);
    res.status(500).json({ error: "Conversion failed." });
  }
});

// ✅ Download route (after conversion)
app.get("/api/download/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(outputsDir, fileName);

  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ error: "File not found" });
  }
});

// ✅ Extract text from converted PDF (for edit)
app.post("/api/extract", async (req, res) => {
  const { filePath } = req.body;

  try {
    const fileBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(fileBuffer);
    res.json({ text: data.text });
  } catch (error) {
    console.error("❌ PDF Extraction Failed:", error);
    res.status(500).json({ error: "Failed to extract content for editing" });
  }
});

// ✅ Extract editable text from DOC/DOCX (if needed)
app.post("/api/extract-text", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;

  try {
    const result = await mammoth.extractRawText({ path: filePath });
    fs.unlinkSync(filePath); // Clean up uploaded file
    res.json({ text: result.value });
  } catch (err) {
    console.error("❌ Text extraction error:", err);
    res.status(500).json({ error: "Failed to extract text" });
  }
});

// ✅ Convert edited text to downloadable PDF
app.post("/api/generate-pdf", async (req, res) => {
  const { content } = req.body;

  try {
    const outputPath = path.join(outputsDir, `${Date.now()}-edited.pdf`);
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(outputPath);

    doc.pipe(writeStream);
    doc.font("Times-Roman").fontSize(14).text(content, { align: "left" });
    doc.end();

    writeStream.on("finish", () => {
      res.download(outputPath, "edited.pdf", () => {
        fs.unlinkSync(outputPath);
      });
    });
  } catch (err) {
    console.error("❌ PDF generation error:", err);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
});

// ✅ Excel to PDF (extract content first)
app.post("/api/convert/excel-to-pdf", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // 2D array

    const textData = jsonData.map((row) => row.join(" | ")).join("\n");

    fs.unlinkSync(filePath); // Clean up
    res.json({ text: textData });
  } catch (err) {
    console.error("❌ Excel extraction error:", err);
    res.status(500).json({ error: "Failed to extract Excel content." });
  }
});

app.post("/api/convert/ppt-to-pdf", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;
  const outputPath = path.join(outputsDir, `${Date.now()}-ppt.pdf`);

  try {
    const inputBuffer = fs.readFileSync(filePath);

    libreConvert.convert(inputBuffer, ".pdf", undefined, (err, done) => {
      if (err) {
        console.error("❌ PPT to PDF failed:", err);
        return res.status(500).json({ error: "PPT to PDF conversion failed" });
      }

      fs.writeFileSync(outputPath, done);
      fs.unlinkSync(filePath); // delete uploaded PPT

      res.download(outputPath, "converted-ppt.pdf", () => {
        fs.unlinkSync(outputPath); // clean up
      });
    });
  } catch (err) {
    console.error("❌ PPT Conversion Error:", err);
    res.status(500).json({ error: "Conversion failed." });
  }
});

app.post("/api/convert/image-to-pdf", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;
  const outputPath = path.join(outputsDir, `${Date.now()}-image.pdf`);

  try {
    const doc = new PDFDocument({ autoFirstPage: false });
    const writeStream = fs.createWriteStream(outputPath);
    doc.pipe(writeStream);

    // Add image to a new page (fit to A4 size)
    const image = fs.readFileSync(filePath);
    const dimensions = await sharp(image).metadata();

    doc.addPage({ size: 'A4' });
    doc.image(image, {
      fit: [500, 700],
      align: "center",
      valign: "center",
    });

    doc.end();

    writeStream.on("finish", () => {
      fs.unlinkSync(filePath); // delete uploaded image
      res.download(outputPath, "converted-image.pdf", () => {
        fs.unlinkSync(outputPath); // clean up
      });
    });
  } catch (err) {
    console.error("❌ Image to PDF Error:", err);
    res.status(500).json({ error: "Image to PDF conversion failed" });
  }
});



// PDF → PPT


app.post("/api/convert/pdf-to-ppt", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;

    // ✅ Read and parse PDF content
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    const pages = data.text.split("\n\n"); // rough split per page

    // ✅ Create PPT and add slides
    const pptx = new PptxGenJS();
    pages.forEach((pageText, index) => {
      const slide = pptx.addSlide();
      slide.addText(pageText, {
        x: 0.5,
        y: 0.5,
        w: "90%",
        h: "90%",
        fontSize: 14,
        color: "363636",
        align: "left",
      });
    });

    const outputPath = path.join(__dirname, "outputs", `${Date.now()}-converted.pptx`);
    await pptx.writeFile({ fileName: outputPath });

    // ✅ Send file to client
    res.download(outputPath, () => {
      fs.unlinkSync(filePath);
      fs.unlinkSync(outputPath); // delete ppt after download
    });
  } catch (err) {
    console.error("❌ PDF to PPT conversion error:", err);
    res.status(500).json({ error: "Failed to convert PDF to PPT" });
  }
});






// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
