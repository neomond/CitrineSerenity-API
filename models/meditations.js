const mongoose = require("mongoose");

const meditationSchema = new mongoose.Schema({
  title: String,
  type: String,
  subtitle: String,
  description: String,
  imgUrl: String,
  relatedSessions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MeditationSession",
    },
  ],
});

const Meditation = mongoose.model("Meditation", meditationSchema);

module.exports = { Meditation };
