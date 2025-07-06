const express = require("express");
const router = express.Router();
const multer = require("multer");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const upload = multer({ dest: "uploads/" });
const convert = (inputPath, format) =>
  `soffice --headless --convert-to ${format} --outdir converted ${inputPath}`;

const routes = [
  { path: "doc-to-pdf", format: "pdf", ext: "pdf" },
  { path: "doc-to-excel", format: "xlsx", ext: "xlsx" },
  { path: "excel-to-doc", format: "doc", ext: "doc" },
  { path: "excel-to-pdf", format: "pdf", ext: "pdf" },
  { path: "pdf-to-doc", format: "doc", ext: "doc" },
  { path: "pdf-to-excel", format: "xlsx", ext: "xlsx" },
];

routes.forEach(({ path: p, format, ext }) => {
  router.post(`/${p}`, upload.single("file"), (req, res) => {
    const inFile = req.file.path;
    const outDir = "converted";
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
    exec(convert(inFile, format), (err) => {
      if (err) return res.status(500).send("Conversion error");
      const outFile = path.join(outDir, `${req.file.filename}.${ext}`);
      res.download(outFile, `${req.body.title}.${ext}`, () => {
        fs.unlinkSync(inFile);
        fs.unlinkSync(outFile);
      });
    });
  });
});

module.exports = router;
