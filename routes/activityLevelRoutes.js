const express = require("express");
const router = express.Router();
const ActivityLevel = require("../models/activitylevel");

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const activityLevel = new ActivityLevel({ name });
    await activityLevel.save();
    res.status(201).json({ message: "Activity level created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
