const mongoose = require("mongoose");

const yogaSchema = new mongoose.Schema({
  title: String,
  type: String,
  subtitle: String,
  description: String,
  imgUrl: String,
  sessions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
    },
  ],
});

const Yoga = mongoose.model("Yoga", yogaSchema);

module.exports = { Yoga };
