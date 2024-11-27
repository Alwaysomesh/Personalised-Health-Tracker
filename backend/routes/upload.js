const express = require("express");
const multer = require("multer");
const Document = require("backend/models/Document");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./uploads"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Upload a document
router.post("/upload", upload.single("healthDocument"), async (req, res) => {
    const { userId } = req.body;
    const filePath = req.file.path;

    try {
        const document = new Document({ userId, filePath });
        await document.save();
        res.status(201).json({ message: "Document uploaded successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error uploading document" });
    }
});

// Retrieve documents
router.get("/documents/:userId", async (req, res) => {
    try {
        const documents = await Document.find({ userId: req.params.userId });
        res.json(documents);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving documents" });
    }
});

module.exports = router;
