const mongoose = require("mongoose");

const activityLevelSchema = mongoose.Schema({
  name: {
    type: String,
    enum: [
      "Very Active (daily exercise)",
      "Active (exercise 3 times a week)",
      "Intermittent (exercise once a week)",
      "Not at all",
    ],
    required: true,
  },
});

const ActivityLevel = mongoose.model("ActivityLevel", activityLevelSchema);

module.exports = ActivityLevel;
