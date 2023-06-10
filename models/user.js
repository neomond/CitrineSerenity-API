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
  activityLevel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ActivityLevel",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
