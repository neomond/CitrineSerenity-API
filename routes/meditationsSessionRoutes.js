const express = require("express");
const { MeditationSession } = require("../models/meditationSessions");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const meditationSessions = await MeditationSession.find();
    res.json(meditationSessions);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const newSessionData = req.body;
    const newSession = new MeditationSession(newSessionData);
    await newSession.save();

    res.status(201).json(newSession);
  } catch (error) {
    res.status(500).json({ message: "Error adding session", error });
  }
});

module.exports = router;
