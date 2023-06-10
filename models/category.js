const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category: String,
  data: [
    {
      key: String,
      title: String,
      duration: String,
      image: String,
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category };
