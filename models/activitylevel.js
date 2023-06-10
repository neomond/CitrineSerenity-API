const mongoose = require("mongoose");

const activityLevelSchema = mongoose.Schema({
  name: {
    type: String,
    enum: ["Low", "Moderate", "High", "Very High"],
    required: true,
  },
});

const ActivityLevel = mongoose.model("ActivityLevel", activityLevelSchema);

module.exports = ActivityLevel;
