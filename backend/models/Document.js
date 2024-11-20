const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    filePath: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Document", DocumentSchema);
