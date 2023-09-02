const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { MeditationSession } = require("../models/meditationSessions");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination folder where you want to store the uploaded MP3 files
    cb(null, path.join(__dirname, "../assets"));
  },
  filename: (req, file, cb) => {
    // Use the original file name for the uploaded MP3 file
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// GET route to fetch all meditation sessions
router.get("/", async (req, res) => {
  try {
    const meditationSessions = await MeditationSession.find();
    res.json(meditationSessions);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});

// POST route to create a new meditation session with an MP3 file
router.post("/", upload.single("trackId"), async (req, res) => {
  try {
    const newSessionData = req.body;

    // Extract the uploaded MP3 file information
    const mp3File = req.file;

    // If you have additional fields to save along with the file, you can access them from newSessionData

    // Check if the MP3 file exists
    if (!mp3File) {
      return res.status(400).json({ message: "MP3 file not found" });
    }

    // Use the mp3File object to access file information (e.g., filename, path)
    const trackId = mp3File.originalname;

    // Create a write stream for GridFS to store the MP3 file
    const writeStream = gfs.createWriteStream({
      filename: trackId, // You can specify a custom file name here
    });

    // Pipe the uploaded file to the write stream (GridFS)
    fs.createReadStream(mp3File.path).pipe(writeStream);

    // When the write stream is finished, save the session data with the trackId
    writeStream.on("close", (file) => {
      newSessionData.trackId = file._id;
      const newSession = new MeditationSession(newSessionData);
      newSession.save((err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error adding session", error: err });
        }
        return res.status(201).json(newSession);
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding session", error });
  }
});

// PUT route to update an existing meditation session's MP3 file
router.put("/:id/mp3", upload.single("mp3File"), async (req, res) => {
  const sessionId = req.params.id;

  try {
    const session = await MeditationSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const mp3File = req.file;

    if (!mp3File) {
      return res.status(400).json({ message: "MP3 file not found" });
    }

    const trackId = mp3File.originalname;

    // Create a write stream for GridFS to store the updated MP3 file
    const writeStream = gfs.createWriteStream({
      filename: trackId, // You can specify a custom file name here
    });

    // Pipe the uploaded file to the write stream (GridFS)
    fs.createReadStream(mp3File.path).pipe(writeStream);

    // When the write stream is finished, update the session's trackId
    writeStream.on("close", (file) => {
      session.trackId = file._id;
      session.save((err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error updating session", error: err });
        }
        return res
          .status(200)
          .json({ message: "MP3 file updated successfully" });
      });
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});

module.exports = router;
