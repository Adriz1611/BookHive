const express = require("express");
const multer = require("multer");
const Image = require("../models/image");

const router = express.Router();

// Multer configuration for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Upload image route
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { originalname, mimetype, buffer, size } = req.file;

    // Create a new image document
    const image = new Image({
      filename: req.file.filename || originalname,
      originalname,
      mimetype,
      buffer,
      size,
    });

    // Save image in the database
    await image.save();
    res
      .status(201)
      .json({ message: "Image uploaded successfully", imageId: image._id });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error uploading image", error: err.message });
  }
});

// Fetch all image metadata
router.get("/files", async (req, res) => {
  try {
    const images = await Image.find(
      {},
      "filename originalname mimetype size createdAt"
    );
    res.status(200).json(images);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching images", error: err.message });
  }
});

// Fetch and display a specific image
router.get("/files/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.set("Content-Type", image.mimetype);
    res.send(image.buffer);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching image", error: err.message });
  }
});

// Download an image
router.get("/download/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.set(
      "Content-Disposition",
      `attachment; filename="${image.originalname}"`
    );
    res.set("Content-Type", image.mimetype);
    res.send(image.buffer);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error downloading image", error: err.message });
  }
});

module.exports = router;
