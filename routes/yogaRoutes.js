const express = require("express");
const { Yoga } = require("../models/yoga");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const yogas = await Yoga.find().populate("sessions");
    res.json(yogas);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const newYogaData = req.body;
    const newYoga = new Yoga(newYogaData);

    newYoga.sessions = newYogaData.sessions;

    await newYoga.save();

    res.status(201).json(newYoga);
  } catch (error) {
    res.status(500).json({ message: "Error adding meditation", error });
  }
});

module.exports = router;
