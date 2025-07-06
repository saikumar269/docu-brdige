const { exec } = require("child_process");

const convertDocToPdf = (inputPath, outputDir) => {
  return new Promise((resolve, reject) => {
    exec(
      `soffice --headless --convert-to pdf --outdir "${outputDir}" "${inputPath}"`,
      (error, stdout, stderr) => {
        if (error) return reject(error);
        resolve(stdout);
      }
    );
  });
};

module.exports = { convertDocToPdf };
