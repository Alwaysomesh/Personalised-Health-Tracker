const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const uploadRoutes = require("./routes/upload");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);

// Database Connection
mongoose
    .connect("mongodb://localhost:27017/health-tracker", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
