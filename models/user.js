const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
  },
  height: {
    type: Number,
  },
  birthdate: {
    type: Date,
  },
  activityLevel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ActivityLevel",
  },
  otp: {
    type: String,
  },
  description: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
