const mongoose = require("mongoose");

const meditationSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  type: String,
  description: String,
  imgUrl: String,
  categories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const Meditation = mongoose.model("Meditation", meditationSchema);

module.exports = { Meditation };
