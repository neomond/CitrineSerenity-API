const mongoose = require("mongoose");

const meditationsSessionScheme = new mongoose.Schema({
  title: String,
  subtitle: String,
  meditations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meditation",
    },
  ],
  duration: String,
  imageUrl: String,
  trackId: String,
});

const MeditationSession = mongoose.model(
  "MeditationSession",
  meditationsSessionScheme
);

module.exports = { MeditationSession };
