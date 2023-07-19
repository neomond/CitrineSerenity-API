const mongoose = require("mongoose");

const sessionScheme = new mongoose.Schema({
  title: String,
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  duration: String,
  imageUrl: String,
});

const Session = mongoose.model("Session", sessionScheme);

module.exports = { Session };
