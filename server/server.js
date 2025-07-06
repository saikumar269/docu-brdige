const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const convertRouter = require("./routes/convert");
const downloadRouter = require("./routes/download");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/convert", convertRouter);
app.use("/api/downloads", downloadRouter);
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);


// MongoDB connection
const connectDB = require("./config/db");
connectDB();

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
