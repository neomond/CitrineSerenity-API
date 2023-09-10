const express = require("express");
const { User } = require("../models/user");
const router = express.Router();

router.post("/onboarding", async (req, res) => {
  try {
    const { email, name, activityLevel, weight, height, birthdate } = req.body;
    console.log("Received activity levellllllll:", activityLevel);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.name = name;
    user.activityLevel = activityLevel;
    user.weight = weight;
    user.height = height;
    user.birthdate = birthdate;

    await user.save();
    console.log("User activity level saved in the database");

    res.status(200).json({ message: "Onboarding data saved successfully" });
  } catch (error) {
    console.error("Error saving onboarding data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
