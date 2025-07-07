const ExcelJS = require("exceljs");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

async function excelToPdf(inputPath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(inputPath);
  const sheet = workbook.worksheets[0];

  const pdfPath = inputPath.replace(/\.xlsx?$/, ".pdf");
  const doc = new PDFDocument();
  const writeStream = fs.createWriteStream(pdfPath);
  doc.pipe(writeStream);

  sheet.eachRow((row, rowNum) => {
    const rowData = row.values.slice(1).join(" | ");
    doc.text(rowData);
  });

  doc.end();

  return new Promise((resolve, reject) => {
    writeStream.on("finish", () => resolve(pdfPath));
    writeStream.on("error", reject);
  });
}

module.exports = excelToPdf;
