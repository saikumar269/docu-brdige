const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { convertFile } = require("./convert");

const app = express();
const PORT = 5000;

// server/index.js
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json());

// Multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// File conversion route
app.post("/api/convert", upload.single("file"), async (req, res) => {
  try {
    const inputPath = req.file.path;
    const outputPath = await convertFile(inputPath);

    res.download(outputPath, (err) => {
      fs.unlinkSync(inputPath); // delete uploaded
      fs.unlinkSync(outputPath); // delete output
    });
  } catch (err) {
    res.status(500).json({ error: "Conversion failed." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
