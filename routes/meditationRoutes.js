const express = require("express");
const { Meditation } = require("../models/meditations");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const meditations = await Meditation.find().populate("relatedSessions");
    res.json(meditations);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const newMeditationData = req.body;
    const newMeditation = new Meditation(newMeditationData);

    newMeditation.relatedSessions = newMeditationData.relatedSessions;

    await newMeditation.save();

    res.status(201).json(newMeditation);
  } catch (error) {
    res.status(500).json({ message: "Error adding meditation", error });
  }
});

module.exports = router;
