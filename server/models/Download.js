const mongoose = require("mongoose");

const downloadSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Download", downloadSchema);
