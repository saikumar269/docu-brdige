const express = require("express");
const router = express.Router();
const Download = require("../models/Download");

// Save a downloaded file info
router.post("/", async (req, res) => {
  try {
    const { userId, title, description } = req.body;

    const newDownload = new Download({
      userId,
      title,
      description,
    });

    const saved = await newDownload.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to save download info" });
  }
});

// Get all downloads for a user
router.get("/:userId", async (req, res) => {
  try {
    const downloads = await Download.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(downloads);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch downloads" });
  }
});

module.exports = router;
