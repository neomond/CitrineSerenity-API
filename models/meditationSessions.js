const mongoose = require("mongoose");

const meditationsSessionScheme = new mongoose.Schema({
  title: String,
  meditations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meditation",
    },
  ],
  duration: String,
  imageUrl: String,
});

const MeditationSession = mongoose.model(
  "MeditationSession",
  meditationsSessionScheme
);

module.exports = { MeditationSession };
