const express = require("express");
const { Meditation } = require("../models/meditations");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const meditations = await Meditation.find().populate({
      path: "category",
      populate: { path: "sessions" },
    });

    res.json(meditations);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
});

module.exports = router;
