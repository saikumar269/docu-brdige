const express = require("express");
const router = express.Router();
const multer = require("multer");
const libre = require('libreoffice-convert');
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { promisify } = require('util');

if (!fs.existsSync(path.join(__dirname, "outputs"))) {
  fs.mkdirSync(path.join(__dirname, "outputs"));
}


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


const libreConvertAsync = promisify(libre.convert);

const convertFile = async (inputPath) => {
  const ext = ".pdf";
  const outputPath = path.join(__dirname, "outputs", `${Date.now()}-converted.pdf`);

  const docxBuf = fs.readFileSync(inputPath);
  const pdfBuf = await libreConvertAsync(docxBuf, ext, undefined);

  fs.writeFileSync(outputPath, pdfBuf);
  return outputPath;
};

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
module.exports = { convertFile, routes };
